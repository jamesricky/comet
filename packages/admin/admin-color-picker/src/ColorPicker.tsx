import { InputWithPopper, InputWithPopperProps } from "@comet/admin";
import { Box, ComponentsOverrides, InputAdornment, InputBaseProps, Theme } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import * as React from "react";
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { ColorPickerBaseProps } from "react-colorful/dist/types";
import tinycolor from "tinycolor2";
import { useDebouncedCallback } from "use-debounce";

import { ColorPickerClassKey, styles } from "./ColorPicker.styles";
import { ColorPickerPreview, ColorPickerPreviewProps } from "./ColorPickerPreview";

export interface ColorPickerProps extends Omit<InputWithPopperProps, "children" | "onChange" | "value" | "componentsProps"> {
    value?: string | null;
    onChange?: (color: string | null) => void;
    colorFormat?: "hex" | "rgba";
    colorPalette?: string[];
    disablePicker?: boolean;
    fullWidth?: boolean;
    startAdornment?: InputBaseProps["startAdornment"];
    endAdornment?: InputBaseProps["endAdornment"];
    invalidIndicatorCharacter?: string;
    componentsProps?: {
        colorPickerPreview?: Partial<Omit<ColorPickerPreviewProps, "value">>;
        hexColorPicker?: Partial<ColorPickerBaseProps<string>>;
        rgbaStringColorPicker?: Partial<ColorPickerBaseProps<string>>;
    };
}

const ColorPicker = ({
    value,
    colorFormat = "hex",
    disablePicker,
    colorPalette,
    onChange,
    startAdornment,
    onBlur,
    classes,
    componentsProps,
    ...rest
}: ColorPickerProps & WithStyles<typeof styles>): React.ReactElement => {
    const [displayValue, setDisplayValue] = React.useState<string>(value ?? "");

    React.useEffect(() => {
        setDisplayValue(value ?? "");
    }, [value, setDisplayValue]);

    /**
     * When quickly sliding in the color-picker, multiple `onChange` events would be triggered every second.
     * Debouncing those events ensures the picker is always responsive and prevents it from sometimes crashing.
     */
    const debouncedOnChange = useDebouncedCallback((color) => {
        onChange && onChange(color);
    }, 250);

    const onChangeColor = (color: string) => {
        const colorValue = tinycolor(color);

        if (colorValue.isValid()) {
            const stringValue = colorFormat === "rgba" ? colorValue.toRgbString() : colorValue.toHexString();
            debouncedOnChange(stringValue);
            setDisplayValue(stringValue);
        } else {
            debouncedOnChange(null);
            setDisplayValue("");
        }
    };

    return (
        <InputWithPopper
            startAdornment={
                startAdornment ? (
                    startAdornment
                ) : (
                    <InputAdornment position="start">
                        <ColorPickerPreview value={displayValue} {...componentsProps?.colorPickerPreview} />
                    </InputAdornment>
                )
            }
            value={displayValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setDisplayValue(e.currentTarget.value);
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onBlur && onBlur(e);
                onChangeColor(displayValue);
            }}
            {...rest}
        >
            {() => {
                return (
                    <div className={classes.popperRoot}>
                        {!disablePicker && (
                            <div className={classes.colorPickerWrapper}>
                                {colorFormat === "hex" && (
                                    <HexColorPicker color={value ?? ""} onChange={onChangeColor} {...componentsProps?.hexColorPicker} />
                                )}
                                {colorFormat === "rgba" && (
                                    <RgbaStringColorPicker color={value ?? ""} onChange={onChangeColor} {...componentsProps?.rgbaStringColorPicker} />
                                )}
                            </div>
                        )}
                        {colorPalette?.length && (
                            <div className={classes.colorPalette}>
                                {colorPalette.map((color, index) => (
                                    <Box
                                        className={classes.colorPaletteItem}
                                        key={`${index}_${color}`}
                                        onClick={() => onChangeColor(color)}
                                        sx={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        </InputWithPopper>
    );
};

const ColorPickerWithStyles = withStyles(styles, { name: "CometAdminColorPicker" })(ColorPicker);
export { ColorPickerWithStyles as ColorPicker };

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminColorPicker: ColorPickerClassKey;
    }

    interface ComponentsPropsList {
        CometAdminColorPicker: ColorPickerProps;
    }

    interface Components {
        CometAdminColorPicker?: {
            defaultProps?: ComponentsPropsList["CometAdminColorPicker"];
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminColorPicker"];
        };
    }
}
