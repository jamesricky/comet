import {
    CheckboxField,
    CheckboxListField,
    EmailField,
    Field,
    FieldContainer,
    FinalFormCheckbox,
    FinalFormInput,
    FinalFormRadio,
    FinalFormSearchTextField,
    FinalFormSelect,
    FinalFormSwitch,
    NumberField,
    PasswordField,
    RadioListField,
    SelectField,
    SwitchField,
    TextAreaField,
    TextField,
} from "@comet/admin";
import { ColorField } from "@comet/admin-color-picker";
import { DateField, DateRangeField, DateTimeField, TimeField, TimeRangeField } from "@comet/admin-date-time";
import { Button, Card, CardContent, CardHeader, Divider, FormControlLabel, Grid, Link, MenuItem } from "@mui/material";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";

function Story() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const numberOptions = [
        { value: 1, label: "One" },
        { value: 2, label: "Two" },
        { value: 3, label: "Three" },
    ];

    return (
        <Form
            onSubmit={(values) => {
                alert(JSON.stringify(values, undefined, 2));
            }}
            initialValues={{ checkbox: false, radio: "foo", switch: false }}
            render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container mb={2} spacing={2}>
                        <Grid item md={6}>
                            <Card variant="outlined">
                                <CardHeader title="Text Inputs & Selects" titleTypographyProps={{ variant: "h3" }} />
                                <CardContent>
                                    <TextField name="text" label="Text" fullWidth />
                                    <EmailField name="email" label="Email" fullWidth />
                                    <PasswordField name="password" label="Password" fullWidth />
                                    <NumberField name="number" label="Number" fullWidth />
                                    <SelectField name="select" label="Select" fullWidth options={options} />
                                    <SelectField<number> name="numberSelect" label="Number Select" fullWidth options={numberOptions} />
                                    <TextAreaField name="textarea" label="TextArea" fullWidth />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card variant="outlined">
                                <CardHeader title="Radios & Checkboxes" titleTypographyProps={{ variant: "h3" }} />
                                <CardContent>
                                    <div>
                                        <RadioListField name="radio" label="Radio (horizontal)" fullWidth options={options} />
                                        <RadioListField
                                            name="radioHorizontal"
                                            label="Radio (vertical)"
                                            fullWidth
                                            variant="vertical"
                                            options={options}
                                        />
                                    </div>
                                    <Divider sx={{ marginY: 6 }} />
                                    <div>
                                        <CheckboxListField name="checkboxListVertical" label="Checkbox List (vertical)" fullWidth options={options} />
                                        <CheckboxListField
                                            name="checkboxListHorizontal"
                                            label="Checkbox List (horizontal)"
                                            fullWidth
                                            variant="vertical"
                                            options={options}
                                        />
                                    </div>
                                    <Divider sx={{ marginY: 6 }} />
                                    <div>
                                        <CheckboxField
                                            name="singleCheckboxWithLink"
                                            label={
                                                <>
                                                    Single checkbox with a{" "}
                                                    <Link href="https://www.comet-dxp.com" target="_blank">
                                                        link
                                                    </Link>{" "}
                                                    inside the label.
                                                </>
                                            }
                                            fullWidth
                                        />
                                        <SwitchField name="switch" label={values.switch ? "On" : "Off"} fieldLabel="Switch" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card variant="outlined">
                                <CardHeader title="Date & Time Field Components" titleTypographyProps={{ variant: "h3" }} />
                                <CardContent>
                                    <DateField name="date" label="Date" fullWidth />
                                    <DateRangeField name="dateRange" label="Date Range" fullWidth />
                                    <TimeField name="time" label="Time" fullWidth />
                                    <TimeRangeField name="timeRange" label="Time Range" fullWidth />
                                    <DateTimeField name="dateTime" label="Date Time" fullWidth />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card variant="outlined">
                                <CardHeader title="Special Field Components" titleTypographyProps={{ variant: "h3" }} />
                                <CardContent>
                                    <ColorField name="color" label="Color" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card variant="outlined">
                                <CardHeader title="Using legacy <Field /> component" titleTypographyProps={{ variant: "h3" }} />
                                <CardContent>
                                    <Field name="input" label="FinalFormInput" fullWidth component={FinalFormInput} />
                                    <Field name="search" label="FinalFormSearchTextField" component={FinalFormSearchTextField} />
                                    <Field
                                        name="text"
                                        label="FinalFormInput (multiline)"
                                        multiline
                                        rows={3}
                                        rowsMax={5}
                                        fullWidth
                                        component={FinalFormInput}
                                    />
                                    <Field name="checkbox" type="checkbox" fullWidth>
                                        {(props) => <FormControlLabel label="FinalFormCheckbox" control={<FinalFormCheckbox {...props} />} />}
                                    </Field>
                                    <FieldContainer label="FinalFormRadio" fullWidth>
                                        <Field name="radio" type="radio" value="foo">
                                            {(props) => <FormControlLabel label="Foo" control={<FinalFormRadio {...props} />} />}
                                        </Field>
                                        <Field name="radio" type="radio" value="bar">
                                            {(props) => <FormControlLabel label="Bar" control={<FinalFormRadio {...props} />} />}
                                        </Field>
                                    </FieldContainer>
                                    <Field name="select" label="FinalFormSelect" fullWidth>
                                        {(props) => (
                                            <FinalFormSelect {...props}>
                                                {options.map((option) => (
                                                    <MenuItem value={option.value} key={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </FinalFormSelect>
                                        )}
                                    </Field>
                                    <Field name="switch" label="FinalFormSwitch" fullWidth>
                                        {(props) => (
                                            <FormControlLabel label={values.switch ? "On" : "Off"} control={<FinalFormSwitch {...props} />} />
                                        )}
                                    </Field>
                                    <Button color="primary" variant="contained" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                </form>
            )}
        />
    );
}

storiesOf("@comet/admin/form", module).add("AllFieldComponents", () => <Story />);
