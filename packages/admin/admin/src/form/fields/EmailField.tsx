import { Mail } from "@comet/admin-icons";
import { InputAdornment } from "@mui/material";
import * as React from "react";

import { TextField, TextFieldProps } from "./TextField";

export type EmailFieldProps = TextFieldProps;

export const EmailField = ({ ...restProps }: EmailFieldProps): React.ReactElement => {
    // TODO: Validation?
    // TODO: Icon?
    return (
        <TextField
            startAdornment={
                <InputAdornment position="start" disablePointerEvents>
                    <Mail />
                </InputAdornment>
            }
            type="email"
            {...restProps}
        />
    );
};
