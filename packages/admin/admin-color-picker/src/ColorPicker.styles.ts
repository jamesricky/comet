import { Theme } from "@mui/material";
import { createStyles } from "@mui/styles";

import { ColorPickerProps } from "./ColorPicker";

export type ColorPickerClassKey = "popperRoot" | "colorPickerWrapper" | "colorPalette" | "colorPaletteItem";

export const styles = (theme: Theme) => {
    return createStyles<ColorPickerClassKey, ColorPickerProps>({
        popperRoot: {
            width: 255,
        },
        colorPickerWrapper: {
            "& .react-colorful": {
                width: "100%",
                height: 220,

                "&__saturation, &__hue, &__alpha": {
                    borderRadius: 0,
                },
            },
        },
        colorPalette: {
            display: "flex",
            flexWrap: "wrap",
            padding: theme.spacing(2),
            gap: theme.spacing(1),
        },
        colorPaletteItem: {
            cursor: "pointer",
            width: 25,
            height: 25,
            flexShrink: 0,
            border: `thin solid ${theme.palette.divider}`,
            boxSizing: "border-box",
        },
    });
};
