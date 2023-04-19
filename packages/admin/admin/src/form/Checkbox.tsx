import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

export type FinalFormCheckboxProps<Value extends string | number = string | number> = FieldRenderProps<Value, HTMLInputElement> & CheckboxProps;

export const FinalFormCheckbox = <Value extends string | number = string | number>({
    input: { checked, name, onChange, ...restInput },
    meta,
    ...rest
}: FinalFormCheckboxProps<Value>): React.ReactElement => {
    return <MuiCheckbox {...rest} name={name} inputProps={restInput} onChange={onChange} checked={checked} />;
};
