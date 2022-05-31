import {
    Field,
    FieldContainer,
    FinalForm,
    FinalFormAutocomplete,
    FinalFormCheckbox,
    FinalFormInput,
    FinalFormRadio,
    FinalFormSearchTextField,
    FinalFormSelect,
    FinalFormSwitch,
    Select,
    useAsyncOptionsProps,
} from "@comet/admin";
import { Button, FormControlLabel, MenuItem } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { apolloStoryDecorator } from "../../../apollo-story.decorator";

interface Option {
    value: string;
    label: string;
}

storiesOf("stories/form/Custom Fields", module)
    .addDecorator(apolloStoryDecorator())
    .add("FinalFormInput", () => {
        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
            >
                <Field component={FinalFormInput} name="text" label="Text" placeholder="Some Text" fullWidth />
                <Field component={FinalFormInput} name="number" label="Number" type="number" placeholder="12" fullWidth />
                <Field component={FinalFormInput} name="email" label="Email" type="email" placeholder="john.doe@example.com" fullWidth />
                <Field component={FinalFormInput} name="password" label="Password" type="password" placeholder="Password" fullWidth />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    })
    .add("FinalFormSearchTextField", () => {
        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
            >
                <Field name="search" label="FinalFormSearchTextField" component={FinalFormSearchTextField} fullWidth />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    })
    .add("FinalFormAutocomplete", () => {
        const options: Option[] = [
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
        ];

        const initialValues = {
            autocomplete: { value: "strawberry", label: "Strawberry" },
            autocompleteAsync: { value: "strawberry", label: "Strawberry" },
        };

        const acAsyncProps = useAsyncOptionsProps<Option>(async () => {
            return new Promise((resolve) => setTimeout(() => resolve(options), 3000));
        });

        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
                initialValues={initialValues}
            >
                <Field
                    component={FinalFormAutocomplete}
                    getOptionLabel={(option: Option) => option.label}
                    getOptionSelected={(option: Option, value: Option) => {
                        return option.value === value.value;
                    }}
                    options={options}
                    name="autocomplete"
                    label="Autocomplete"
                    fullWidth
                />
                <Field
                    component={FinalFormAutocomplete}
                    {...acAsyncProps}
                    getOptionLabel={(option: Option) => option.label}
                    getOptionSelected={(option: Option, value: Option) => {
                        return option.value === value.value;
                    }}
                    name="autocompleteAsync"
                    label="AutocompleteAsync"
                    fullWidth
                />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    })
    .add("FinalFormSelect", () => {
        const options: Option[] = [
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
        ];

        const initialValues = {
            autocomplete: { value: "strawberry", label: "Strawberry" },
            autocompleteAsync: { value: "strawberry", label: "Strawberry" },
        };

        const selectAsyncProps = useAsyncOptionsProps<Option>(async () => {
            return new Promise((resolve) => setTimeout(() => resolve(options), 500));
        });

        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
                initialValues={initialValues}
            >
                <Field
                    component={FinalFormSelect}
                    getOptionLabel={(option: Option) => option.label}
                    getOptionSelected={(option: Option, value: Option) => {
                        return option.value === value.value;
                    }}
                    options={options}
                    name="select"
                    label="Select"
                    fullWidth
                />
                <Field
                    component={FinalFormSelect}
                    getOptionLabel={(option: Option) => option.label}
                    getOptionSelected={(option: Option, value: Option) => {
                        return option.value === value.value;
                    }}
                    {...selectAsyncProps}
                    name="selectAsync"
                    label="SelectAsync"
                    fullWidth
                />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    })
    .add("Select", () => {
        const options: Option[] = [
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
        ];

        const [value, setValue] = React.useState<string>(options[0].value);

        return (
            <Select value={value} onChange={(event: React.ChangeEvent<{ name?: string; value: string }>) => setValue(event.target.value)}>
                {options.map((option) => (
                    <MenuItem value={option.value} key={JSON.stringify(option)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        );
    })
    .add("FinalFormCheckbox", () => {
        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
            >
                <Field name="checkbox" type="checkbox" fullWidth>
                    {(props) => <FormControlLabel label="FinalFormCheckbox" control={<FinalFormCheckbox {...props} />} />}
                </Field>
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    })
    .add("FinalFormSwitch", () => {
        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
            >
                <Field name="switch" label="FinalFormSwitch" fullWidth>
                    {(props) => <FormControlLabel label={props.input.value ? "On" : "Off"} control={<FinalFormSwitch {...props} />} />}
                </Field>
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    })
    .add("FinalFormRadio", () => {
        return (
            <FinalForm
                mode="add"
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 4));
                }}
            >
                <FieldContainer label="FinalFormRadio" fullWidth>
                    <Field name="radio" type="radio" value="option1">
                        {(props) => <FormControlLabel label="Option 1" control={<FinalFormRadio {...props} />} />}
                    </Field>
                    <Field name="radio" type="radio" value="option2">
                        {(props) => <FormControlLabel label="Option 2" control={<FinalFormRadio {...props} />} />}
                    </Field>
                </FieldContainer>
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </FinalForm>
        );
    });
