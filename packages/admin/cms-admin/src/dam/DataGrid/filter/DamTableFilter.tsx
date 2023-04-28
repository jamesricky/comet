import {
    Field,
    FilterBar,
    FilterBarPopoverFilter,
    FilterBarSelect,
    FinalFormSearchTextField,
    FinalFormSwitch,
    IFilterApi,
    ISortInformation,
    SortDirection,
    TableFilterFinalForm,
} from "@comet/admin";
import { FormControlLabel, SelectChangeEvent } from "@mui/material";
import { withStyles } from "@mui/styles";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { DamFilter } from "../../DamTable";

type Sorting = {
    sortInfo: ISortInformation;
    label: React.ReactNode;
};

const useSortings = (): Sorting[] => {
    const intl = useIntl();

    return [
        {
            sortInfo: {
                columnName: "name",
                direction: SortDirection.ASC,
            },
            label: intl.formatMessage({ id: "comet.pages.dam.filename", defaultMessage: "Filename" }),
        },
        {
            sortInfo: {
                columnName: "updatedAt",
                direction: SortDirection.DESC,
            },
            label: intl.formatMessage({ id: "comet.pages.dam.changeDate", defaultMessage: "Change Date" }),
        },
        {
            sortInfo: {
                columnName: "createdAt",
                direction: SortDirection.DESC,
            },
            label: intl.formatMessage({ id: "comet.pages.dam.creationDate", defaultMessage: "Creation Date" }),
        },
    ];
};

interface DamTableFilterProps {
    hideArchiveFilter?: boolean;
    filterApi: IFilterApi<DamFilter>;
}

export const DamTableFilter = ({ filterApi, hideArchiveFilter }: DamTableFilterProps): React.ReactElement => {
    const intl = useIntl();
    const sortings = useSortings();

    return (
        <TableFilterFinalForm filterApi={filterApi}>
            <FilterBar>
                <Field name="searchText" component={FinalFormSearchTextField} />
                {!hideArchiveFilter && (
                    <ArchivedPopoverFilter label={intl.formatMessage({ id: "comet.pages.dam.archived", defaultMessage: "Archived" })}>
                        <Field name="archived" type="checkbox">
                            {(props) => (
                                <FormControlLabel
                                    control={<FinalFormSwitch {...props} />}
                                    label={<FormattedMessage id="comet.pages.dam.showArchivedAssets" defaultMessage="Show archived assets" />}
                                />
                            )}
                        </Field>
                    </ArchivedPopoverFilter>
                )}
                <Field<ISortInformation> name="sort">
                    {({ input }) => (
                        <FilterBarSelect
                            label={intl.formatMessage({ id: "comet.pages.dam.sorting", defaultMessage: "Sorting" })}
                            onChange={(e: SelectChangeEvent<string | number>) => {
                                input.onChange({ columnName: e.target.value, direction: SortDirection.ASC });
                            }}
                            value={input.value.columnName}
                            options={sortings.map((sorting) => ({
                                value: sorting.sortInfo.columnName,
                                label: sorting.label,
                            }))}
                            // renderValue={(value) => (
                            //     <FormattedMessage
                            //         id="comet.pages.dam.sorting"
                            //         defaultMessage="Sorting: {sorting}"
                            //         values={{
                            //             sorting: sortings.find((sorting) => sorting.sortInfo.columnName === value)?.label,
                            //         }}
                            //     />
                            // )}
                        />
                    )}
                </Field>
            </FilterBar>
        </TableFilterFinalForm>
    );
};

const ArchivedPopoverFilter = withStyles({
    root: {
        marginBottom: 0,
    },
})(FilterBarPopoverFilter);
