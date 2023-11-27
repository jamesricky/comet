import { Theme } from "@mui/material/styles";
import { MUIStyledCommonProps, SxProps } from "@mui/system";
import React from "react";

type SlotProps<Component extends React.ElementType> = Partial<React.ComponentProps<Component>> & MUIStyledCommonProps<Theme>;

export type RootSlotProps<SlotKeyToElementType extends Record<string, React.ElementType> = never> = {
    sx?: SxProps<Theme>;
    className?: string;
    slotProps?: {
        [K in keyof SlotKeyToElementType]?: SlotProps<SlotKeyToElementType[K]>;
    };
};
