import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, HTMLInputElement> {}

export const FinalFormCheckbox: React.FunctionComponent<IProps & CheckboxProps> = ({
    input: { checked, name, onChange, ...restInput },
    meta,
    ...rest
}) => {
    return <MuiCheckbox {...rest} name={name} inputProps={restInput} onChange={onChange} checked={checked} />;
};
