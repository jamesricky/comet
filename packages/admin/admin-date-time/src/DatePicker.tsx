import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { InputWithPopper, InputWithPopperProps } from "@comet/admin";
import { ComponentsOverrides, Theme } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import * as React from "react";
import { Calendar, CalendarProps } from "react-date-range";
// @ts-expect-error Locales are not exported directly by react-date-range
import * as reactDateRangeLocales from "react-date-range/dist/locale";
import { FormatDateOptions, useIntl } from "react-intl";

import { DatePickerClassKey, styles } from "./DatePicker.styles";
import { DatePickerNavigation } from "./DatePickerNavigation";

type DatePickerComponentsProps = InputWithPopperProps["componentsProps"] & {
    calendar?: Partial<Omit<CalendarProps, "onChange" | "date">>;
};

export interface DatePickerProps extends Omit<InputWithPopperProps, "children" | "value" | "onChange" | "componentsProps"> {
    onChange?: CalendarProps["onChange"];
    value?: Date;
    formatDateOptions?: FormatDateOptions;
    componentsProps?: DatePickerComponentsProps;
    monthsToShow?: number;
    maxDate?: Date;
    minDate?: Date;
}

const defaultMinDate = new Date();
defaultMinDate.setFullYear(defaultMinDate.getFullYear() - 15);

const defaultMaxDate = new Date();
defaultMaxDate.setFullYear(defaultMaxDate.getFullYear() + 15);

function DatePicker({
    classes,
    onChange,
    value,
    componentsProps = {},
    formatDateOptions,
    monthsToShow,
    minDate = defaultMinDate,
    maxDate = defaultMaxDate,
    ...inputWithPopperProps
}: DatePickerProps & WithStyles<typeof styles>): React.ReactElement {
    const { calendar: calendarClass, ...inputWithPopperClasses } = classes;
    const { calendar: calendarProps, ...inputWithPopperComponentsProps } = componentsProps;
    const intl = useIntl();

    return (
        <InputWithPopper
            classes={inputWithPopperClasses}
            value={value ? intl.formatDate(value, formatDateOptions) : ""}
            {...inputWithPopperProps}
            componentsProps={inputWithPopperComponentsProps}
            readOnly
        >
            {(closePopper) => (
                <Calendar
                    className={calendarClass}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekStartsOn={1}
                    direction="horizontal"
                    monthDisplayFormat="MMMM yyyy"
                    months={monthsToShow}
                    locale={reactDateRangeLocales[intl.locale]}
                    navigatorRenderer={(focusedDate, changeShownDate) => (
                        <DatePickerNavigation focusedDate={focusedDate} changeShownDate={changeShownDate} minDate={minDate} maxDate={maxDate} />
                    )}
                    date={value}
                    onChange={(date) => {
                        closePopper(true);
                        onChange && onChange(date);
                    }}
                    {...calendarProps}
                />
            )}
        </InputWithPopper>
    );
}

const DatePickerWithStyles = withStyles(styles, { name: "CometAdminDatePicker" })(DatePicker);

export { DatePickerWithStyles as DatePicker };

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminDatePicker: DatePickerClassKey;
    }

    interface ComponentsPropsList {
        CometAdminDatePicker: DatePickerProps;
    }

    interface Components {
        CometAdminDatePicker?: {
            defaultProps?: ComponentsPropsList["CometAdminDatePicker"];
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminDatePicker"];
        };
    }
}
