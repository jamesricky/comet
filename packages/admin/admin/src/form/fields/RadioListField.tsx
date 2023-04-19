import { FormControlLabel, FormControlLabelProps } from "@mui/material";
import React from "react";

import { Field, FieldProps } from "../Field";
import { FieldContainer, FieldContainerProps } from "../FieldContainer";
import { FinalFormRadio, FinalFormRadioProps } from "../Radio";

export type RadioListFieldOption<Value extends string | number = string | number> = {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
};

export interface RadioListFieldProps<Value extends string | number = string | number> extends FieldContainerProps {
    variant?: "horizontal" | "vertical";
    name: string;
    options: RadioListFieldOption<Value>[];
    componentsProps?: {
        field?: FieldProps<string, HTMLInputElement>;
        formControlLabel?: FormControlLabelProps;
        finalFormRadio?: FinalFormRadioProps;
    };
}

// TODO: More spacing in vertical mode to prevent overlapping of clickable area.
export function RadioListField<Value extends string | number = string | number>({
    variant = "horizontal",
    name,
    options,
    componentsProps = {},
    ...restProps
}: RadioListFieldProps<Value>) {
    const { field: fieldProps, formControlLabel: formControlLabelProps, finalFormRadio: finalFormRadioProps } = componentsProps;
    return (
        <FieldContainer {...restProps}>
            {options.map(({ value, label, disabled }) => (
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
                        <FormControlLabel
                            label={label}
                            control={<FinalFormRadio disabled={disabled} {...props} {...finalFormRadioProps} />}
                            {...formControlLabelProps}
                        />
                    )}
                </Field>
            ))}
        </FieldContainer>
    );
}
