import { Field } from "@comet/admin";
import { FinalFormDatePicker } from "@comet/admin-date-time";
import { Calendar } from "@comet/admin-icons";
import { InputAdornment } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import moment from "moment";
import * as React from "react";
import { Form } from "react-final-form";

const Story = () => {
    const initialValues = {
        date2: moment().toDate(),
        date3: moment().toDate(),
        date4: moment().toDate(),
    };
    return (
        <Form onSubmit={() => {}} initialValues={initialValues}>
            {({ values }) => (
                <form style={{ width: 350 }}>
                    <Field name="date1" label="Date" component={FinalFormDatePicker} fullWidth />
                    <Field
                        name="date2"
                        label="Date, with icon"
                        component={FinalFormDatePicker}
                        endAdornment={
                            <InputAdornment position="start">
                                <Calendar />
                            </InputAdornment>
                        }
                    />
                    <Field name="date3" label="Date, with clear-button" component={FinalFormDatePicker} showClearButton />
                    <Field
                        name="date4"
                        label="Date, required"
                        required
                        component={FinalFormDatePicker}
                        startAdornment={
                            <InputAdornment position="start">
                                <Calendar />
                            </InputAdornment>
                        }
                    />
                    <Field name="date5" label="Date, disabled" disabled component={FinalFormDatePicker} />

                    <pre>{JSON.stringify(values, null, 4)}</pre>
                </form>
            )}
        </Form>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date Picker", () => <Story />);
