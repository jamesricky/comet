import { Admin } from "@comet/admin-icons";
import { InputAdornment } from "@mui/material";
import * as React from "react";

import { TextField, TextFieldProps } from "./TextField";

export type PasswordFieldProps = TextFieldProps;

export const PasswordField = ({ ...restProps }: PasswordFieldProps): React.ReactElement => {
    // TODO: Icon?
    // TODO: Toggle visibility?
    return (
        <TextField
            type="password"
            startAdornment={
                <InputAdornment position="start" disablePointerEvents>
                    <Admin />
                </InputAdornment>
            }
            {...restProps}
        />
    );
};
