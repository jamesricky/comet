import { Invisible, Visible } from "@comet/admin-icons";
import { ButtonBase, InputAdornment } from "@mui/material";
import * as React from "react";

import { TextField, TextFieldProps } from "./TextField";

export type PasswordFieldProps = TextFieldProps & {
    disableVisibilityToggle?: boolean;
};

export const PasswordField = ({ disableVisibilityToggle, ...restProps }: PasswordFieldProps): React.ReactElement => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <TextField
            endAdornment={
                !disableVisibilityToggle && (
                    // TODO: Create InputAdornmentButton for this
                    <InputAdornment position="end" sx={{ mr: "-11px" }}>
                        <ButtonBase
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{
                                height: "100%",
                                paddingLeft: "11px",
                                paddingRight: "11px",
                                fontSize: 12,
                            }}
                        >
                            {showPassword ? <Invisible /> : <Visible />}
                        </ButtonBase>
                    </InputAdornment>
                )
            }
            type={showPassword ? "text" : "password"}
            {...restProps}
        />
    );
};
