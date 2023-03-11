import * as React from "react";

import { Field, FieldProps } from "../Field";
import { FinalFormInput } from "../FinalFormInput";

export type NumberFieldProps = FieldProps<number, HTMLInputElement>;

export const NumberField = ({ ...restProps }: NumberFieldProps): React.ReactElement => {
    // TODO: Number-Icon?
    return <Field type="number" component={FinalFormInput} {...restProps} />;
};
