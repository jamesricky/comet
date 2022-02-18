import { Theme } from "@mui/material";
import { createStyles } from "@mui/styles";

import { FilterBarPopoverFilterProps } from "./FilterBarPopoverFilter";

export type FilterBarPopoverFilterClassKey =
    | "root"
    | "fieldBarWrapper"
    | "fieldBarInnerWrapper"
    | "labelWrapper"
    | "labelWrapperWithValues"
    | "popoverContentContainer"
    | "paper"
    | "buttonsContainer";

export const styles = ({ palette, typography }: Theme) => {
    return createStyles<FilterBarPopoverFilterClassKey, FilterBarPopoverFilterProps>({
        root: {
            backgroundColor: palette.common.white,
            position: "relative",
            marginBottom: "10px",
            borderRadius: "2px",
            marginRight: "6px",
        },
        fieldBarWrapper: {
            position: "relative",
            border: `1px solid ${palette.grey[100]}`,
        },
        fieldBarInnerWrapper: {
            position: "relative",
            alignItems: "center",
            padding: "10px 15px",
            cursor: "pointer",
            display: "flex",

            "& [class*='MuiSvgIcon-root']": {
                fontSize: 12,
            },
        },
        labelWrapper: {
            boxSizing: "border-box",
            marginRight: "6px",
            "& [class*='MuiTypography-body1']": {
                fontWeight: typography.fontWeightRegular,
            },
        },

        labelWrapperWithValues: {
            "& [class*='MuiTypography-body1']": {
                fontWeight: typography.fontWeightBold,
            },
        },
        popoverContentContainer: {
            minWidth: 300,
            "& [class*='CometAdminFormFieldContainer-root']": {
                boxSizing: "border-box",
                padding: "20px",
                marginBottom: 0,
            },
        },
        buttonsContainer: {
            borderTop: `1px solid ${palette.grey[100]}`,
            justifyContent: "space-between",
            boxSizing: "border-box",
            padding: "10px 15px",
            display: "flex",
            height: 60,
        },
        paper: {
            marginLeft: -1, //due to border of popover, but now overrideable with styling if needed
            marginTop: 2, //due to boxShadow of popover to not overlap border of clickable fieldBar
        },
    });
};
