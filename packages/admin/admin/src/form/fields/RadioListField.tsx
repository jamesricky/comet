import { FormControlLabel, FormControlLabelProps } from "@mui/material";
import React from "react";

import { Field, FieldProps } from "../Field";
import { FieldContainer, FieldContainerProps } from "../FieldContainer";
import { FinalFormRadio, FinalFormRadioProps } from "../Radio";

export interface RadioListFieldProps extends FieldContainerProps {
    variant?: "horizontal" | "vertical";
    name: string;
    options: Array<{ value: string; label: React.ReactNode }>;
    componentsProps?: {
        field?: FieldProps<string, HTMLInputElement>;
        formControlLabel?: FormControlLabelProps;
        finalFormRadio?: FinalFormRadioProps;
    };
}

// TODO: More spacing in vertical mode to prevent overlapping of clickable area.

export function RadioListField({ variant = "horizontal", name, options, componentsProps = {}, ...restProps }: RadioListFieldProps) {
    const { field: fieldProps, formControlLabel: formControlLabelProps, finalFormRadio: finalFormRadioProps } = componentsProps;
    return (
        <FieldContainer {...restProps}>
            {options.map(({ value, label }) => (
                <Field
                    name={name}
                    type="radio"
                    value={value}
                    key={value}
                    fieldContainerProps={{ fieldMargin: "never" }}
                    fullWidth={variant === "vertical"}
                    {...fieldProps}
                >
                    {(props) => (
                        <FormControlLabel label={label} control={<FinalFormRadio {...props} {...finalFormRadioProps} />} {...formControlLabelProps} />
                    )}
                </Field>
            ))}
        </FieldContainer>
    );
}
