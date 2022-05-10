import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { Palette, PaletteOptions } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";
import createTypography, { Typography, TypographyOptions } from "@mui/material/styles/createTypography";
import { createSpacing, Spacing } from "@mui/system";
import { deepmerge } from "@mui/utils";

import { getComponentsTheme } from "./componentsTheme/getComponentsTheme";
import { paletteOptions as cometPaletteOptions } from "./paletteOptions";
import { shadows } from "./shadows";
import { typographyOptions as cometTypographyOptions } from "./typographyOptions";

export const createCometTheme = (customThemeOptions: ThemeOptions | undefined = {}): Theme => {
    const {
        palette: customPaletteOptions = {},
        typography: customTypographyOptions = {},
        spacing: spacingOptions = 5,
        components: customComponentsOptions = {},
        ...restCustomThemeOptions
    } = customThemeOptions;

    const paletteOptions: PaletteOptions = deepmerge(cometPaletteOptions, customPaletteOptions);
    const palette: Palette = createPalette(paletteOptions);

    const customTypographyOptionsObject: TypographyOptions =
        typeof customTypographyOptions === "function" ? customTypographyOptions(palette) : customTypographyOptions;
    const typographyOptions: TypographyOptions = deepmerge(cometTypographyOptions, customTypographyOptionsObject);
    const typography: Typography = createTypography(palette, typographyOptions);

    const spacing: Spacing = createSpacing(spacingOptions);

    const cometThemeOptions: ThemeOptions = {
        spacing: spacingOptions,
        palette: paletteOptions,
        typography: typographyOptions,
        shape: {
            borderRadius: 2,
        },
        shadows,
        components: getComponentsTheme(customComponentsOptions, { palette, typography, spacing }),
    };

    const themeOptions = deepmerge<ThemeOptions>(cometThemeOptions, restCustomThemeOptions);
    return createTheme(themeOptions);
};
