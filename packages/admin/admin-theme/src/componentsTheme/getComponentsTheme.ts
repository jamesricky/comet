import { Theme, ThemeOptions } from "@mui/material";
import { Palette } from "@mui/material/styles";
import { Components } from "@mui/material/styles/components";
import { Typography } from "@mui/material/styles/createTypography";
import { ComponentNameToClassKey, ComponentsOverrides } from "@mui/material/styles/overrides";
import { Spacing } from "@mui/system";

import { getMuiAppBar } from "./MuiAppBar";
import { getMuiAutocomplete } from "./MuiAutocomplete";
import { getMuiButton } from "./MuiButton";
import { getMuiButtonGroup } from "./MuiButtonGroup";
import { getMuiCardContent } from "./MuiCardContent";
import { getMuiCheckbox } from "./MuiCheckbox";
import { getMuiDialog } from "./MuiDialog";
import { getMuiDialogActions } from "./MuiDialogActions";
import { getMuiDialogContent } from "./MuiDialogContent";
import { getMuiDialogContentText } from "./MuiDialogContentText";
import { getMuiDialogTitle } from "./MuiDialogTitle";
import { getMuiDrawer } from "./MuiDrawer";
import { getMuiFormControlLabel } from "./MuiFormControlLabel";
import { getMuiFormLabel } from "./MuiFormLabel";
import { getMuiIconButton } from "./MuiIconButton";
import { getMuiInputAdornment } from "./MuiInputAdornment";
import { getMuiInputBase } from "./MuiInputBase";
import { getMuiLink } from "./MuiLink";
import { getMuiListItem } from "./MuiListItem";
import { getMuiPaper } from "./MuiPaper";
import { getMuiPopover } from "./MuiPopover";
import { getMuiRadio } from "./MuiRadio";
import { getMuiSelect } from "./MuiSelect";
import { getMuiSvgIcon } from "./MuiSvgIcon";
import { getMuiSwitch } from "./MuiSwitch";
import { getMuiTab } from "./MuiTab";
import { getMuiTableCell } from "./MuiTableCell";
import { getMuiTableRow } from "./MuiTableRow";
import { getMuiTabs } from "./MuiTabs";
import { getMuiToggleButton } from "./MuiToggleButton";
import { getMuiToggleButtonGroup } from "./MuiToggleButtonGroup";
import { getMuiTypography } from "./MuiTypography";

export type ThemeData = {
    palette: Palette;
    typography: Typography;
    spacing: Spacing;
};

export type GetMuiComponentTheme<ClassesName extends keyof ComponentNameToClassKey> = (
    styleOverrides: ComponentsOverrides<Theme>[ClassesName],
    data: ThemeData,
) => Components[ClassesName];

export const getComponentsTheme = (components: Components, data: ThemeData): ThemeOptions["components"] => ({
    MuiAppBar: getMuiAppBar(components.MuiAppBar?.styleOverrides, data),
    MuiAutocomplete: getMuiAutocomplete(components.MuiAutocomplete?.styleOverrides, data),
    MuiButton: getMuiButton(components.MuiButton?.styleOverrides, data),
    MuiButtonGroup: getMuiButtonGroup(components.MuiButtonGroup?.styleOverrides, data),
    MuiCardContent: getMuiCardContent(components.MuiCardContent?.styleOverrides, data),
    MuiCheckbox: getMuiCheckbox(components.MuiCheckbox?.styleOverrides, data),
    MuiDialog: getMuiDialog(components.MuiDialog?.styleOverrides, data),
    MuiDialogActions: getMuiDialogActions(components.MuiDialogActions?.styleOverrides, data),
    MuiDialogContent: getMuiDialogContent(components.MuiDialogContent?.styleOverrides, data),
    MuiDialogContentText: getMuiDialogContentText(components.MuiDialogContentText?.styleOverrides, data),
    MuiDialogTitle: getMuiDialogTitle(components.MuiDialogTitle?.styleOverrides, data),
    MuiDrawer: getMuiDrawer(components.MuiDrawer?.styleOverrides, data),
    MuiFormControlLabel: getMuiFormControlLabel(components.MuiFormControlLabel?.styleOverrides, data),
    MuiFormLabel: getMuiFormLabel(components.MuiFormLabel?.styleOverrides, data),
    MuiIconButton: getMuiIconButton(components.MuiIconButton?.styleOverrides, data),
    MuiInputAdornment: getMuiInputAdornment(components.MuiInputAdornment?.styleOverrides, data),
    MuiInputBase: getMuiInputBase(components.MuiInputBase?.styleOverrides, data),
    MuiLink: getMuiLink(components.MuiLink?.styleOverrides, data),
    MuiListItem: getMuiListItem(components.MuiListItem?.styleOverrides, data),
    MuiPaper: getMuiPaper(components.MuiPaper?.styleOverrides, data),
    MuiPopover: getMuiPopover(components.MuiPopover?.styleOverrides, data),
    MuiRadio: getMuiRadio(components.MuiRadio?.styleOverrides, data),
    MuiSelect: getMuiSelect(components.MuiSelect?.styleOverrides, data),
    MuiSvgIcon: getMuiSvgIcon(components.MuiSvgIcon?.styleOverrides, data),
    MuiSwitch: getMuiSwitch(components.MuiSwitch?.styleOverrides, data),
    MuiTab: getMuiTab(components.MuiTab?.styleOverrides, data),
    MuiTableCell: getMuiTableCell(components.MuiTableCell?.styleOverrides, data),
    MuiTableRow: getMuiTableRow(components.MuiTableRow?.styleOverrides, data),
    MuiTabs: getMuiTabs(components.MuiTabs?.styleOverrides, data),
    MuiToggleButton: getMuiToggleButton(components.MuiToggleButton?.styleOverrides, data),
    MuiToggleButtonGroup: getMuiToggleButtonGroup(components.MuiToggleButtonGroup?.styleOverrides, data),
    MuiTypography: getMuiTypography(components.MuiTypography?.styleOverrides, data),
});
