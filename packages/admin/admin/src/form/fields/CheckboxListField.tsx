import { FormControlLabel, FormControlLabelProps } from "@mui/material";
import React from "react";

import { FinalFormCheckbox } from "../Checkbox";
import { Field, FieldProps } from "../Field";
import { FieldContainer, FieldContainerProps } from "../FieldContainer";
import { FinalFormRadioProps } from "../Radio";

export type CheckboxListFieldOption<Value extends string | number = string | number> = {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
};

export interface CheckboxListFieldProps<Value extends string | number = string | number> extends FieldContainerProps {
    variant?: "horizontal" | "vertical";
    name?: string;
    options: CheckboxListFieldOption<Value>[];
    componentsProps?: {
        field?: FieldProps<string, HTMLInputElement>;
        formControlLabel?: FormControlLabelProps;
        finalFormCheckbox?: FinalFormRadioProps;
    };
}

// TODO: More spacing in vertical mode to prevent overlapping of clickable area.
export function CheckboxListField<Value extends string | number = string | number>({
    variant = "horizontal",
    name,
    options,
    componentsProps = {},
    ...restProps
}: CheckboxListFieldProps<Value>) {
    const { field: fieldProps, formControlLabel: formControlLabelProps, finalFormCheckbox: finalFormRadioProps } = componentsProps;
    return (
        <FieldContainer {...restProps}>
            {options.map(({ value, label, disabled }) => (
                <Field
                    name={name ? `${name}.${value}` : `${value}`}
                    type="checkbox"
                    key={value}
                    fieldContainerProps={{ fieldMargin: "never" }}
                    fullWidth={variant === "vertical"}
                    {...fieldProps}
                    style={{ marginTop: 7, marginBottom: 7 }}
                >
                    {(props) => (
                        <FormControlLabel
                            label={label}
                            control={<FinalFormCheckbox disabled={disabled} {...props} {...finalFormRadioProps} />}
                            {...formControlLabelProps}
                        />
                    )}
                </Field>
            ))}
        </FieldContainer>
    );
}
