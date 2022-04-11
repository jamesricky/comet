import { ComponentsOverrides, Theme } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import * as React from "react";
import tinycolor from "tinycolor2";

import { ColorPickerPreviewClassKey, styles } from "./ColorPickerPreview.styles";

export type ColorPickerPreviewProps = {
    value: string;
    invalidIndicatorCharacter?: string;
    components?: {
        ColorPickerPreviewColor?: React.ElementType<ColorPickerPreviewColorProps>;
        ColorPickerPreviewInvalid?: React.ElementType<ColorPickerPreviewInvalidProps>;
        ColorPickerPreviewEmpty?: React.ElementType<ColorPickerPreviewEmptyProps>;
    };
};

export interface ColorPickerPreviewColorProps extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
}

const ColorPickerPreviewColor = ({ color, ...restProps }: ColorPickerPreviewColorProps): React.ReactElement => {
    return <div {...restProps} style={{ backgroundColor: color }} />;
};

export interface ColorPickerPreviewInvalidProps extends React.HTMLAttributes<HTMLDivElement> {
    invalidIndicatorCharacter?: string;
}

const ColorPickerPreviewInvalid = ({ invalidIndicatorCharacter, ...restProps }: ColorPickerPreviewInvalidProps): React.ReactElement => {
    return <div {...restProps}>{invalidIndicatorCharacter}</div>;
};

export type ColorPickerPreviewEmptyProps = React.HTMLAttributes<HTMLDivElement>;

const ColorPickerPreviewEmpty = (props: ColorPickerPreviewEmptyProps): React.ReactElement => {
    return <div {...props} />;
};

const ColorPickerPreview = ({
    value,
    invalidIndicatorCharacter = "?",
    classes,
    components = {},
}: ColorPickerPreviewProps & WithStyles<typeof styles>) => {
    const {
        ColorPickerPreviewColor: Color = ColorPickerPreviewColor,
        ColorPickerPreviewInvalid: Invalid = ColorPickerPreviewInvalid,
        ColorPickerPreviewEmpty: Empty = ColorPickerPreviewEmpty,
    } = components;
    const colorValue = value ? tinycolor(value) : null;

    return (
        <div className={classes.root}>
            {colorValue ? (
                colorValue.isValid() ? (
                    <Color color={colorValue.toRgbString()} className={`${classes.indicator} ${classes.indicatorColor}`} />
                ) : (
                    <Invalid invalidIndicatorCharacter={invalidIndicatorCharacter} className={`${classes.indicator} ${classes.indicatorInvalid}`} />
                )
            ) : (
                <Empty className={`${classes.indicator} ${classes.indicatorEmpty}`} />
            )}
        </div>
    );
};

const ColorPickerPreviewWithStyles = withStyles(styles, { name: "CometAdminColorPickerPreview" })(ColorPickerPreview);
export { ColorPickerPreviewWithStyles as ColorPickerPreview };

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminColorPickerPreview: ColorPickerPreviewClassKey;
    }

    interface ComponentsPropsList {
        CometAdminColorPickerPreview: ColorPickerPreviewProps;
    }

    interface Components {
        CometAdminColorPickerPreview?: {
            defaultProps?: ComponentsPropsList["CometAdminColorPickerPreview"];
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminColorPickerPreview"];
        };
    }
}
