import MuiRadio, { RadioProps } from "@mui/material/Radio";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, HTMLInputElement> {}

export const FinalFormRadio: React.FunctionComponent<IProps & RadioProps> = ({
    input: { checked, value, name, onChange, ...restInput },
    meta,
    ...rest
}) => <MuiRadio {...rest} name={name} inputProps={restInput} onChange={onChange} checked={!!checked} value={value} />;
