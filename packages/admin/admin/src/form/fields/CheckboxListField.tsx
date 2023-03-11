import { FormControlLabel, FormControlLabelProps } from "@mui/material";
import React from "react";

import { FinalFormCheckbox } from "../Checkbox";
import { Field, FieldProps } from "../Field";
import { FieldContainer, FieldContainerProps } from "../FieldContainer";
import { FinalFormRadioProps } from "../Radio";

export interface CheckboxListFieldProps extends FieldContainerProps {
    variant?: "horizontal" | "vertical";
    name?: string;
    options: Array<{ value: string; label: React.ReactNode }>;
    componentsProps?: {
        field?: FieldProps<string, HTMLInputElement>;
        formControlLabel?: FormControlLabelProps;
        finalFormCheckbox?: FinalFormRadioProps;
    };
}

// TODO: More spacing in vertical mode to prevent overlapping of clickable area.

export function CheckboxListField({ variant = "horizontal", name, options, componentsProps = {}, ...restProps }: CheckboxListFieldProps) {
    const { field: fieldProps, formControlLabel: formControlLabelProps, finalFormCheckbox: finalFormRadioProps } = componentsProps;
    return (
        <FieldContainer {...restProps}>
            {options.map(({ value, label }) => (
                <Field
                    name={name ? `${name}.${value}` : value}
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
                            control={<FinalFormCheckbox {...props} {...finalFormRadioProps} />}
                            {...formControlLabelProps}
                        />
                    )}
                </Field>
            ))}
        </FieldContainer>
    );
}
