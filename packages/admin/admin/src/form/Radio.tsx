import MuiRadio, { RadioProps } from "@mui/material/Radio";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

export type FinalFormRadioProps<Value extends string | number = string | number> = RadioProps & FieldRenderProps<Value, HTMLInputElement>;

export const FinalFormRadio = <Value extends string | number = string | number>({
    input: { checked, value, name, onChange, ...restInput },
    meta,
    ...rest
}: FinalFormRadioProps<Value>): React.ReactElement => (
    <MuiRadio {...rest} name={name} inputProps={restInput} onChange={onChange} checked={!!checked} value={value} />
);
