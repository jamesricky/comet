import { ClearInputButtonThemeProps, CometAdminClearInputButtonClassKeys } from "./common/buttons/clearinput/ClearInputButton";
import { CometAdminErrorBoundaryClassKeys, ErrorBoundaryThemeProps } from "./error/errorboundary/ErrorBoundary";
import { CometAdminFormFieldContainerClassKeys, FieldContainerThemeProps } from "./form/FieldContainer";
import { CometAdminFinalFormRangeInputClassKeys } from "./form/FinalFormRangeInput";
import { CometAdminFormSectionKeys } from "./form/FormSection";
import { CometAdminMasterLayoutClassKeys } from "./mui/MasterLayout.styles";
import { CometAdminMenuCollapsibleItemClassKeys, MenuCollapsibleItemThemeProps } from "./mui/menu/CollapsibleItem";
import { CometAdminMenuItemClassKeys } from "./mui/menu/Item";
import { MenuThemeProps } from "./mui/menu/Menu";
import { CometAdminMenuClassKeys } from "./mui/menu/Menu.styles";
import { CometAdminFilterBarClassKeys } from "./table/filterbar/FilterBar";
import { CometAdminFilterBarPopoverFilterClassKeys, FilterBarPopoverFilterThemeProps } from "./table/filterbar/FilterBarPopoverFilter";

declare module "@material-ui/core/styles/overrides" {
    interface ComponentNameToClassKey {
        CometAdminClearInputButton: CometAdminClearInputButtonClassKeys;
        CometAdminFormFieldContainer: CometAdminFormFieldContainerClassKeys;
        CometAdminMenu: CometAdminMenuClassKeys;
        CometAdminMenuItem: CometAdminMenuItemClassKeys;
        CometAdminMenuCollapsibleItem: CometAdminMenuCollapsibleItemClassKeys;
        CometAdminMasterLayout: CometAdminMasterLayoutClassKeys;
        CometAdminErrorBoundary: CometAdminErrorBoundaryClassKeys;
        CometAdminFormSection: CometAdminFormSectionKeys;
        CometAdminFinalFormRangeInput: CometAdminFinalFormRangeInputClassKeys;
        CometAdminFilterBar: CometAdminFilterBarClassKeys;
        CometAdminFilterBarPopoverFilter: CometAdminFilterBarPopoverFilterClassKeys;
    }
}

declare module "@material-ui/core/styles/props" {
    interface ComponentsPropsList {
        CometAdminClearInputButton: ClearInputButtonThemeProps;
        CometAdminFormFieldContainer: FieldContainerThemeProps;
        CometAdminMenu: MenuThemeProps;
        CometAdminMenuCollapsibleItem: MenuCollapsibleItemThemeProps;
        CometAdminErrorBoundary: ErrorBoundaryThemeProps;
        CometAdminFilterBarPopoverFilter: FilterBarPopoverFilterThemeProps;
    }
}
