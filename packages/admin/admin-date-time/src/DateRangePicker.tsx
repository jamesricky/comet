import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { InputWithPopper, InputWithPopperProps } from "@comet/admin";
import { ComponentsOverrides, Theme } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import * as React from "react";
import { DateRange as ReactDateRange, DateRangeProps as ReactDateRangeProps, Range } from "react-date-range";
import { FormatDateOptions, useIntl } from "react-intl";

import { DatePickerNavigation } from "./DatePickerNavigation";
import { DateRangePickerClassKey, styles } from "./DateRangePicker.styles";

type DateRangePickerComponentsProps = InputWithPopperProps["componentsProps"] & {
    dateRange?: Partial<Omit<ReactDateRangeProps, "onChange" | "ranges">>;
};

export type DateRange = {
    start: Date;
    end: Date;
};

export interface DateRangePickerProps extends Omit<InputWithPopperProps, "children" | "value" | "onChange" | "componentsProps"> {
    onChange?: (range: DateRange) => void;
    value?: DateRange;
    formatDateOptions?: FormatDateOptions;
    rangeStringSeparator?: string;
    componentsProps?: DateRangePickerComponentsProps;
    monthsToShow?: number;
    maxDate?: Date;
    minDate?: Date;
}

const useDateRangeTextValue = (range: DateRange | null | undefined, rangeStringSeparator: string, formatDateOptions?: FormatDateOptions): string => {
    const intl = useIntl();

    if (range) {
        const startDateString = intl.formatDate(range.start, formatDateOptions);
        const endDateString = intl.formatDate(range.end, formatDateOptions);

        if (startDateString === endDateString) {
            return startDateString;
        }

        return `${startDateString}${rangeStringSeparator}${endDateString}`;
    }

    return "";
};

const rangeKey = "pickedDateRange";

const getRangeFromValue = (value: undefined | DateRange): Range => {
    if (value?.start) {
        return {
            key: rangeKey,
            startDate: value.start,
            endDate: value.end ?? value.start,
        };
    }

    // The range-picker from react-date-range always requires at least one valid date range to prevent every date from being highlighted as selected.
    // If no `value` is defined, this returns the current date as the selected range.
    // This range is only for visual purposes and will never be passed to a change event.
    return {
        key: rangeKey,
        startDate: new Date(),
        endDate: new Date(),
    };
};

const defaultMinDate = new Date();
defaultMinDate.setFullYear(defaultMinDate.getFullYear() - 15);

const defaultMaxDate = new Date();
defaultMaxDate.setFullYear(defaultMaxDate.getFullYear() + 15);

function DateRangePicker({
    classes,
    onChange,
    value,
    componentsProps = {},
    formatDateOptions,
    rangeStringSeparator = "  —  ",
    monthsToShow = 2,
    minDate = defaultMinDate,
    maxDate = defaultMaxDate,
    ...inputWithPopperProps
}: DateRangePickerProps & WithStyles<typeof styles>): React.ReactElement {
    const { calendar: calendarClass, ...inputWithPopperClasses } = classes;
    const { dateRange: dateRangeProps, ...inputWithPopperComponentsProps } = componentsProps;
    const textValue = useDateRangeTextValue(value, rangeStringSeparator, formatDateOptions);

    return (
        <InputWithPopper
            classes={inputWithPopperClasses}
            value={textValue}
            {...inputWithPopperProps}
            componentsProps={inputWithPopperComponentsProps}
            readOnly
        >
            {(closePopper) => (
                <ReactDateRange
                    className={calendarClass}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekStartsOn={1}
                    direction="horizontal"
                    monthDisplayFormat="MMMM yyyy"
                    months={monthsToShow}
                    navigatorRenderer={(focusedDate, changeShownDate) => (
                        <DatePickerNavigation focusedDate={focusedDate} changeShownDate={changeShownDate} minDate={minDate} maxDate={maxDate} />
                    )}
                    onRangeFocusChange={(newFocusedRange) => {
                        const rangeSelectionHasCompleted = newFocusedRange[0] === 0 && newFocusedRange[1] === 0;
                        if (rangeSelectionHasCompleted) {
                            closePopper(true);
                        }
                    }}
                    ranges={[getRangeFromValue(value)]}
                    onChange={(ranges) => {
                        const pickedRange = ranges[rangeKey];
                        if (pickedRange.startDate && pickedRange.endDate) {
                            onChange &&
                                onChange({
                                    start: pickedRange.startDate,
                                    end: pickedRange.endDate,
                                });
                        }
                    }}
                    showDateDisplay={false}
                    {...dateRangeProps}
                />
            )}
        </InputWithPopper>
    );
}

const DateRangePickerWithStyles = withStyles(styles, { name: "CometAdminDateRangePicker" })(DateRangePicker);

export { DateRangePickerWithStyles as DateRangePicker };

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminDateRangePicker: DateRangePickerClassKey;
    }

    interface ComponentsPropsList {
        CometAdminDateRangePicker: DateRangePickerProps;
    }

    interface Components {
        CometAdminDateRangePicker?: {
            defaultProps?: ComponentsPropsList["CometAdminDateRangePicker"];
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminDateRangePicker"];
        };
    }
}
