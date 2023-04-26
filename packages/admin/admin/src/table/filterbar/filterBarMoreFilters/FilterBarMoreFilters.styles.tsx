import { Theme } from "@mui/material/styles";
import { createStyles } from "@mui/styles";

import { FilterBarMoreFiltersProps } from "./FilterBarMoreFilters";

export type FilterBarMoveFilersClassKey = "root" | "button";

export const styles = ({ typography }: Theme) => {
    return createStyles<FilterBarMoveFilersClassKey, FilterBarMoreFiltersProps>({
        root: {},
        button: {
            fontWeight: typography.fontWeightBold,
        },
    });
};
