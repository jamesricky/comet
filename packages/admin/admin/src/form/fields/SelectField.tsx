import { MenuItem, MenuItemProps } from "@mui/material";
import React from "react";

import { Field, FieldProps } from "../Field";
import { FinalFormSelect, FinalFormSelectProps } from "../FinalFormSelect";

export type SelectFieldOption<Value extends string | number> = {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
};

export interface SelectFieldProps<Value extends string | number> extends FieldProps<Value, HTMLSelectElement> {
    options: SelectFieldOption<Value>[];
    multiple?: boolean;
    componentsProps?: {
        finalFormSelect?: FinalFormSelectProps<Value>;
        menuItem?: MenuItemProps;
    };
}

export function SelectField<Value extends string | number>({ options, multiple, componentsProps = {}, ...restProps }: SelectFieldProps<Value>) {
    const { finalFormSelect: finalFormSelectProps, menuItem: menuItemProps } = componentsProps;
    return (
        <Field {...restProps}>
            {(props) => (
                <FinalFormSelect<Value> multiple={multiple} {...props} {...finalFormSelectProps}>
                    {options.map(({ value, label, disabled }) => (
                        <MenuItem key={value} value={value} disabled={disabled} {...menuItemProps}>
                            {label}
                        </MenuItem>
                    ))}
                </FinalFormSelect>
            )}
        </Field>
    );
}
