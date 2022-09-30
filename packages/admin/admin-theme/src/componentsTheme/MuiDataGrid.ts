import { Clear } from "@comet/admin-icons";
import { iconButtonClasses, svgIconClasses } from "@mui/material";

import { mergeOverrideStyles } from "../utils/mergeOverrideStyles";
import { GetMuiComponentTheme } from "./getComponentsTheme";

export const getMuiDataGrid: GetMuiComponentTheme<"MuiDataGrid"> = (component, { palette }) => ({
    defaultProps: {
        ...component?.defaultProps,
        components: {
            ...component?.defaultProps?.components,
            QuickFilterClearIcon: Clear,
        },
    },
    styleOverrides: mergeOverrideStyles<"MuiDataGrid">(component?.styleOverrides, {
        // @ts-expect-error Class does exist but is missing in type `GridClasses`
        toolbarQuickFilter: {
            paddingBottom: 0,

            [`& > .${iconButtonClasses.root}`]: {
                marginRight: -10,
                padding: 10,

                [`& > .${svgIconClasses.root}`]: {
                    fontSize: 12,
                    color: palette.grey[200],
                },
            },
        },
    }),
});
