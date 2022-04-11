import { Theme } from "@mui/material";
import { createStyles } from "@mui/styles";

import { ColorPickerPreviewProps } from "./ColorPickerPreview";

export type ColorPickerPreviewClassKey = "root" | "indicator" | "indicatorColor" | "indicatorEmpty" | "indicatorInvalid";

export const styles = (theme: Theme) => {
    const emptyIndicatorLineColor = "red";
    const emptyIndicatorLineWidth = 2;

    return createStyles<ColorPickerPreviewClassKey, ColorPickerPreviewProps>({
        root: {
            position: "relative",
            overflow: "hidden",
            width: 24,
            height: 24,
        },
        indicator: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            border: `thin solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
        },
        indicatorColor: {},
        indicatorEmpty: {
            background: `linear-gradient(to top left, transparent 0%, transparent calc(50% - ${
                emptyIndicatorLineWidth / 2
            }px), ${emptyIndicatorLineColor} calc(50% - ${emptyIndicatorLineWidth / 2}px), ${emptyIndicatorLineColor} calc(50% + ${
                emptyIndicatorLineWidth / 2
            }px), transparent calc(50% + ${emptyIndicatorLineWidth / 2}px), transparent 100%)`,
        },
        indicatorInvalid: {
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.secondary,
            textAlign: "center",
        },
    });
};
