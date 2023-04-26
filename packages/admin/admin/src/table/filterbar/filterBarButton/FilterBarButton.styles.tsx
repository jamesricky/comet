import { buttonClasses, svgIconClasses, Theme } from "@mui/material";
import createStyles from "@mui/styles/createStyles";

import { FilterBarButtonProps } from "./FilterBarButton";

export type FilterBarButtonClassKey = "root" | "open" | "hasDirtyFields" | "filterBadge";

export const styles = (theme: Theme) => {
    return createStyles<FilterBarButtonClassKey, FilterBarButtonProps>({
        root: {
            position: "relative",
            cursor: "pointer",
            display: "flex",
            backgroundColor: theme.palette.common.white, // TOOD: Consider for outlined button variant in comet-theme
            borderColor: theme.palette.grey[100], // TOOD: Consider for outlined button variant in comet-theme
            borderRadius: 2, // TOOD: Consider for outlined button variant in comet-theme

            [`& .${buttonClasses.startIcon} .${svgIconClasses.root}, & .${buttonClasses.endIcon} .${svgIconClasses.root}`]: {
                fontSize: 12,
            },

            // "&:active": {
            //     borderColor: theme.palette.grey[400], // TOOD: Consider for outlined button variant in comet-theme
            //     backgroundColor: theme.palette.common.white, // TOOD: Consider for outlined button variant in comet-theme
            // },

            "&:hover": {
                borderColor: theme.palette.grey[100], // TOOD: Consider for outlined button variant in comet-theme
                backgroundColor: theme.palette.common.white, // TOOD: Consider for outlined button variant in comet-theme
            },

            "&:focus": {
                borderColor: theme.palette.primary.main, // TOOD: Consider for outlined button variant in comet-theme
                backgroundColor: theme.palette.common.white, // TOOD: Consider for outlined button variant in comet-theme
            },

            // "& [class*='MuiButton-startIcon']": {
            //     marginRight: "6px",
            // },

            // "& [class*='MuiButton-endIcon']": {
            //     marginLeft: "10px",
            // },
        },
        open: {
            borderColor: theme.palette.primary.main,
        },
        hasDirtyFields: {
            borderColor: theme.palette.grey[400],
            fontWeight: theme.typography.fontWeightBold,

            "&:disabled": {
                borderColor: theme.palette.grey[100],
            },

            // "& [class*='MuiButton-endIcon']": {
            //     marginLeft: "6px",
            // },
        },
        filterBadge: {
            marginLeft: "6px",
        },
    });
};
