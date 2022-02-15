import { ArrowBack } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { StackApiContext } from "../Api";
import { StackBackButtonClassKey, styles } from "./StackBackButton.styles";

export type StackBackButtonProps = ButtonProps;

const StackBackBtn = ({ startIcon = <ArrowBack />, ...restProps }: StackBackButtonProps & WithStyles<typeof styles>): React.ReactElement => {
    return (
        <StackApiContext.Consumer>
            {(stackApi) => {
                return (
                    <Button
                        disabled={stackApi?.breadCrumbs == null || stackApi?.breadCrumbs.length <= 1}
                        onClick={stackApi?.goBack}
                        startIcon={startIcon}
                        {...restProps}
                    >
                        <FormattedMessage id="cometAdmin.generic.back" defaultMessage="Back" />
                    </Button>
                );
            }}
        </StackApiContext.Consumer>
    );
};

export const StackBackButton = withStyles(styles, { name: "CometAdminStackBackButton" })(StackBackBtn);

declare module "@mui/material/styles/overrides" {
    interface ComponentNameToClassKey {
        CometAdminStackBackButton: StackBackButtonClassKey;
    }
}

declare module "@mui/material/styles/props" {
    interface ComponentsPropsList {
        CometAdminStackBackButton: StackBackButtonProps;
    }
}
