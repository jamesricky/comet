import * as React from "react";
import { IControlProps } from "../types";
import FeaturesButtonGroup from "./FeaturesButtonGroup";
import useHistory from "./useHistory";

export default function HistoryControls({ editorState, setEditorState, options, colors }: IControlProps) {
    const { features } = useHistory({ editorState, setEditorState, supportedThings: options.supports });
    if (features.length < 1) {
        return null;
    }
    return <FeaturesButtonGroup features={features} colors={colors} />;
}
