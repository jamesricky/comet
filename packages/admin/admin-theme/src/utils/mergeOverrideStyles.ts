import { CSSInterpolation, Theme } from "@mui/material";
import { ComponentNameToClassKey, OverridesStyleRules } from "@mui/material/styles/overrides";
import { ComponentsPropsList } from "@mui/material/styles/props";
import { deepmerge } from "@mui/utils";

type OwnerState<PropsName extends keyof ComponentsPropsList> = PropsName extends keyof ComponentsPropsList
    ? { ownerState: ComponentsPropsList[PropsName] & Record<string, unknown> }
    : Record<string, unknown>;

type OverrideProps<PropsName extends keyof ComponentsPropsList> = OwnerState<PropsName> & { theme: Theme } & Record<string, unknown>;

type ClassKey<ClassesName extends keyof ComponentNameToClassKey> = ComponentNameToClassKey[ClassesName];

const getOverridesInterpolation = <PropsName extends keyof ComponentsPropsList>(
    props: OverrideProps<PropsName>,
    overrides?: CSSInterpolation | ((props: OverrideProps<PropsName>) => CSSInterpolation) | undefined,
): CSSInterpolation => {
    if (typeof overrides === "undefined") {
        return {};
    }

    if (typeof overrides === "function") {
        return overrides(props);
    }

    return overrides;
};

export const mergeOverrideStyles = <ComponentName extends keyof ComponentNameToClassKey & keyof ComponentsPropsList>(
    passedIn: Partial<OverridesStyleRules<ClassKey<ComponentName>>> = {},
    comet: Partial<OverridesStyleRules<ClassKey<ComponentName>>> = {},
): Partial<OverridesStyleRules<ClassKey<ComponentName>>> => {
    const mergedOverrides = { ...comet };

    if (typeof mergedOverrides === "undefined") {
        return comet;
    }

    Object.keys(passedIn).forEach((classKey: ClassKey<ComponentName>) => {
        mergedOverrides[classKey] = (props: OverrideProps<ComponentName>) => {
            return deepmerge<CSSInterpolation>(
                getOverridesInterpolation<ComponentName>(props, comet[classKey]),
                getOverridesInterpolation<ComponentName>(props, passedIn[classKey]),
            );
        };
    });

    return mergedOverrides;
};
