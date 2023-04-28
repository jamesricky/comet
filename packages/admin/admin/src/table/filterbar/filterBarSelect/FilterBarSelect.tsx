import { Check } from "@comet/admin-icons";
import {
    ComponentsOverrides,
    ListItemText,
    ListItemTextProps,
    MenuItem,
    MenuItemProps,
    Select,
    selectClasses,
    SelectProps,
    svgIconClasses,
    Theme,
} from "@mui/material";
import { createStyles, WithStyles, withStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";

export interface FilterBarSelectPropsComponentsProps extends SelectProps<"componentsProps"> {
    menuItem?: Partial<MenuItemProps>;
    listItemText?: Partial<ListItemTextProps>;
}

export interface FilterBarSelectProps<Value> extends Omit<SelectProps<Value>, "children" | "componentsProps"> {
    label: string;
    options: Array<{
        label: React.ReactNode;
        value: Value;
    }>;
    selectedIcon?: React.ReactNode;
    componentsProps?: FilterBarSelectPropsComponentsProps;
}

const FilterBarSelect = <Value extends string | number = string>({
    label,
    options,
    value,
    selectedIcon = <Check />,
    classes,
    className,
    componentsProps: { menuItem: menuItemProps, listItemText: listItemTextProps, ...selectComponentsProps } = {},
    ...restProps
}: FilterBarSelectProps<Value> & WithStyles<typeof styles>): React.ReactElement => {
    return (
        <div className={clsx(classes.root, className)}>
            <Select
                renderValue={(value) => {
                    const selectedValue = options.find((option) => option.value === value);
                    console.log({ value, selectedValue, options });
                    if (selectedValue) {
                        return `${label}: ${selectedValue.label}`;
                    }

                    return `${label}`;
                }}
                className={classes.select}
                componentsProps={selectComponentsProps}
                value={value}
                {...restProps}
            >
                {options.map((option) => {
                    const selected = value === option.value;
                    return (
                        <MenuItem key={option.value} value={option.value} {...menuItemProps}>
                            <ListItemText {...listItemTextProps}>{option.label}</ListItemText>
                            {selected && selectedIcon}
                        </MenuItem>
                    );
                })}
            </Select>
        </div>
    );
};

export type FilterBarSelectClassKey = "root" | "select";

const styles = () => {
    return createStyles<FilterBarSelectClassKey, FilterBarSelectProps<string | number>>({
        root: {},
        select: {
            [`& .${selectClasses.select}`]: {
                paddingLeft: 14,
                paddingRight: "14px !important", // TODO: Remove !important
            },

            [`& .${selectClasses.icon} .${svgIconClasses.root}`]: {
                fontSize: 12,
            },
        },
    });
};

const FilterBarSelectWithStyles = withStyles(styles, { name: "CometAdminFilterBarSelect" })(FilterBarSelect);

export { FilterBarSelectWithStyles as FilterBarSelect };

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminFilterBarSelect: FilterBarSelectClassKey;
    }

    interface ComponentsPropsList {
        CometAdminFilterBarSelect: FilterBarSelectProps<string | number>;
    }

    interface Components {
        CometAdminFilterBarSelect?: {
            defaultProps?: ComponentsPropsList["CometAdminFilterBarSelect"];
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminFilterBarSelect"];
        };
    }
}
