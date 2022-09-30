import { useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    GridFilterButton,
    muiGridFilterToGql,
    muiGridSortToGql,
    StackLink,
    Toolbar,
    ToolbarAutomaticTitleItem,
    ToolbarFillSpace,
    ToolbarItem,
    useBufferedRowCount,
    useDataGridRemote,
    usePersistentColumnState,
} from "@comet/admin";
import { Add as AddIcon, Clear, Edit, Search } from "@comet/admin-icons";
import { Alert, Box, Button, IconButton, InputAdornment, InputBase, InputBaseProps } from "@mui/material";
import { DataGridPro, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import {
    GQLCreateProductMutation,
    GQLCreateProductMutationVariables,
    GQLDeleteProductMutation,
    GQLDeleteProductMutationVariables,
    GQLProductsListFragmentFragment,
    GQLProductsListQuery,
    GQLProductsListQueryVariables,
} from "@src/graphql.generated";
import { filter } from "graphql-anywhere";
import gql from "graphql-tag";
import * as React from "react";
import { FormattedMessage } from "react-intl";

interface GridBaseTextFieldProps {
    InputProps: InputBaseProps;
}

// TODO: Move to separate file
const GridBaseTextField = ({ InputProps, ...inputProps }: GridBaseTextFieldProps): React.ReactElement => {
    return (
        <InputBase
            {...inputProps}
            {...InputProps}
            startAdornment={
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            }
        />
    );
};

function ProductsTableToolbar() {
    return (
        <Toolbar>
            <ToolbarAutomaticTitleItem />
            <ToolbarItem>
                <GridToolbarQuickFilter />
            </ToolbarItem>
            <ToolbarFillSpace />
            <ToolbarItem>
                <GridFilterButton />
            </ToolbarItem>
            <ToolbarItem>
                <Button startIcon={<AddIcon />} component={StackLink} pageName="add" payload="add" variant="contained" color="primary">
                    <FormattedMessage id="cometDemo.products.newProduct" defaultMessage="New Product" />
                </Button>
            </ToolbarItem>
        </Toolbar>
    );
}

const columns: GridColDef<GQLProductsListFragmentFragment>[] = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "price", headerName: "Price", width: 150, type: "number" },
    {
        field: "action",
        headerName: "",
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            return (
                <>
                    <IconButton component={StackLink} pageName="edit" payload={params.row.id}>
                        <Edit color="primary" />
                    </IconButton>
                    <CrudContextMenu
                        onPaste={async ({ input, client }) => {
                            await client.mutate<GQLCreateProductMutation, GQLCreateProductMutationVariables>({
                                mutation: createProductMutation,
                                variables: { input },
                            });
                        }}
                        onDelete={async ({ client }) => {
                            await client.mutate<GQLDeleteProductMutation, GQLDeleteProductMutationVariables>({
                                mutation: deleteProductMutation,
                                variables: { id: params.row.id },
                            });
                        }}
                        // url={url}
                        refetchQueries={["ProductsList"]}
                        copyData={() => {
                            return filter<GQLProductsListFragmentFragment>(productsFragment, params.row);
                        }}
                    />
                </>
            );
        },
    },
];

function ProductsTable() {
    const dataGridProps = { ...useDataGridRemote(), ...usePersistentColumnState("ProductsGrid") };
    const sortModel = dataGridProps.sortModel;

    const { filter, query } = muiGridFilterToGql(columns, dataGridProps.filterModel);

    const { data, loading, error } = useQuery<GQLProductsListQuery, GQLProductsListQueryVariables>(productsQuery, {
        variables: {
            filter,
            query,
            offset: dataGridProps.page * dataGridProps.pageSize,
            limit: dataGridProps.pageSize,
            sort: muiGridSortToGql(sortModel),
        },
    });
    const rows = data?.products.nodes ?? [];
    const rowCount = useBufferedRowCount(data?.products.totalCount);

    if (error) {
        return (
            <Alert severity="error">
                <FormattedMessage id="comet.error.abstractErrorMessage" defaultMessage="An error has occurred" />
            </Alert>
        );
        //return <>ERROR: {JSON.stringify(error)}</>;
    }

    return (
        <Box sx={{ height: `calc(100vh - var(--comet-admin-master-layout-content-top-spacing))` }}>
            <DataGridPro
                {...dataGridProps}
                disableSelectionOnClick
                rows={rows}
                rowCount={rowCount}
                columns={columns}
                loading={loading}
                components={{
                    Toolbar: ProductsTableToolbar,
                    BaseTextField: GridBaseTextField, // TODO: Add this to theme defaultProps
                    QuickFilterClearIcon: Clear, // TODO: Add this to theme defaultProps
                }}
            />
        </Box>
    );
}

const productsFragment = gql`
    fragment ProductsListFragment on Product {
        slug
        title
        description
        price
    }
`;

const productsQuery = gql`
    query ProductsList($offset: Int, $limit: Int, $sort: [ProductSort!], $filter: ProductFilter, $query: String) {
        products(offset: $offset, limit: $limit, sort: $sort, filter: $filter, query: $query) {
            nodes {
                id
                ...ProductsListFragment
            }
            totalCount
        }
    }
    ${productsFragment}
`;

const deleteProductMutation = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

const createProductMutation = gql`
    mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
            id
        }
    }
`;

export default ProductsTable;
