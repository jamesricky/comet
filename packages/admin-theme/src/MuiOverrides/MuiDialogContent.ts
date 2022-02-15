import { DialogContentClassKey } from "@mui/material";
import { Palette } from "@mui/material/styles";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const getMuiDialogContentOverrides = (palette: Palette): OverridesStyleRules<DialogContentClassKey> => ({
    root: {
        backgroundColor: palette.grey[50],
        padding: 40,
    },
    dividers: {},
});
