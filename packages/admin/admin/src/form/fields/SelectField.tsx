import { MenuItem, MenuItemProps } from "@mui/material";
import React from "react";

import { Field, FieldProps } from "../Field";
import { FinalFormSelect, FinalFormSelectProps } from "../FinalFormSelect";

export interface SelectFieldProps<Value extends string | number> extends FieldProps<Value, HTMLSelectElement> {
    options: Array<{ value: Value; label: React.ReactNode }>;
    componentsProps?: {
        finalFormSelect?: FinalFormSelectProps<Value>;
        menuItem?: MenuItemProps;
    };
}

export function SelectField<Value extends string | number>({ options, componentsProps = {}, ...restProps }: SelectFieldProps<Value>) {
    const { finalFormSelect: finalFormSelectProps, menuItem: menuItemProps } = componentsProps;
    return (
        <Field {...restProps}>
            {(props) => (
                <FinalFormSelect<Value> {...props} {...finalFormSelectProps}>
                    {options.map(({ value, label }) => (
                        <MenuItem value={value} key={value} {...menuItemProps}>
                            {label}
                        </MenuItem>
                    ))}
                </FinalFormSelect>
            )}
        </Field>
    );
}
