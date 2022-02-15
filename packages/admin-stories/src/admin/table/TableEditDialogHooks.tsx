import {
    Field,
    FinalForm,
    FinalFormInput,
    MainContent,
    Selected,
    Table,
    Toolbar,
    ToolbarActions,
    ToolbarFillSpace,
    ToolbarItem,
    useEditDialog,
} from "@comet/admin";
import { Add as AddIcon, Edit as EditIcon } from "@comet/admin-icons";
import { Button, IconButton, Typography } from "@mui/material";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { apolloStoryDecorator } from "../../apollo-story.decorator";
import { storyRouterDecorator } from "../../story-router.decorator";

interface IExampleRow {
    id: number;
    foo: string;
    bar: string;
}

interface IEditFormProps {
    row: IExampleRow;
    mode: "edit" | "add";
}
function EditForm(props: IEditFormProps) {
    return (
        <FinalForm
            mode={props.mode}
            initialValues={props.row}
            onSubmit={(values) => {
                alert(JSON.stringify(values));
            }}
        >
            <Field name="foo" component={FinalFormInput} type="text" label="Name" fullWidth />
        </FinalForm>
    );
}

function Story() {
    const data: IExampleRow[] = [
        { id: 1, foo: "blub", bar: "blub" },
        { id: 2, foo: "blub", bar: "blub" },
    ];

    const [EditDialog, selection, api] = useEditDialog();

    return (
        <>
            <Toolbar>
                <ToolbarItem>
                    <Typography variant={"h3"}>Edit Dialog Hooks</Typography>
                </ToolbarItem>
                <ToolbarFillSpace />
                <ToolbarActions>
                    <Button
                        color="primary"
                        variant={"contained"}
                        startIcon={<AddIcon />}
                        onClick={(ev) => {
                            api.openAddDialog();
                        }}
                    >
                        Add
                    </Button>
                </ToolbarActions>
            </Toolbar>
            <MainContent>
                <Table
                    data={data}
                    totalCount={data.length}
                    columns={[
                        {
                            name: "foo",
                            header: "Foo",
                        },
                        {
                            name: "bar",
                            header: "Bar",
                        },
                        {
                            name: "edit",
                            header: "Edit",
                            render: (row) => (
                                <IconButton
                                    onClick={(ev) => {
                                        api.openEditDialog(String(row.id));
                                    }}
                                    size="large"
                                >
                                    <EditIcon />
                                </IconButton>
                            ),
                        },
                    ]}
                />

                <EditDialog>
                    {selection.mode && (
                        <Selected selectionMode={selection.mode} selectedId={selection.id} rows={data}>
                            {(row, { selectionMode: sm }) => <EditForm mode={sm} row={row} />}
                        </Selected>
                    )}
                </EditDialog>
            </MainContent>
        </>
    );
}

storiesOf("@comet/admin/table", module)
    .addDecorator(storyRouterDecorator())
    .addDecorator(apolloStoryDecorator())
    .add("EditDialog Hooks", () => <Story />);
