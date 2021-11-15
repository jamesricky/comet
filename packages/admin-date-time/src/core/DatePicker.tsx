import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { ClearInputButton } from "@comet/admin";
import { ClickAwayListener, InputBase, InputBaseProps, Paper, Popper, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { addHours, format as formatDate, isValid as isValidDate, parse as parseDate } from "date-fns";
import * as React from "react";
import { Calendar } from "react-date-range";
import { DayPickerSingleDateController } from "react-dates";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";

import styles, { CometAdminDatePickerClassKeys } from "./DatePicker.styles";

export type DatePickerProps = InputBaseProps &
    FieldRenderProps<Date, HTMLInputElement> & {
        dateFormat?: string;
        numberOfMonths?: number;
        showClearButton?: boolean;
        dateControllerProps?: DayPickerSingleDateController;
    };

function DatePicker({
    classes,
    input,
    disabled,
    placeholder,
    fullWidth = false,
    showClearButton,
    dateControllerProps,
    dateFormat = "yyyy-MM-dd",
    inputProps,
    ...restProps
}: WithStyles<typeof styles> & DatePickerProps): React.ReactElement {
    const intl = useIntl();
    const placeholderText = placeholder
        ? placeholder
        : intl.formatMessage({ id: "cometAdmin.dateTime.datePicker.placeholder", defaultMessage: "Date" });

    const { value, onChange, onBlur, onFocus, ...restInput } = input;
    const rootRef = React.useRef(null);
    const [showPopper, setShowPopper] = React.useState<boolean>(false);
    const [showDayPicker, setShowDayPicker] = React.useState<boolean>(false);
    const [customValue, setCustomValue] = React.useState<string | null>(null);

    const formattedValue = isValidDate(input.value) ? formatDate(input.value, dateFormat) : "";
    const displayValue = customValue ? customValue : formattedValue;

    const showPicker = () => {
        onFocus();
        setShowPopper(true);

        // Wait for the popper to be rendered, so the picker-height can be calculated
        // correctly: https://github.com/airbnb/react-dates/issues/46#issuecomment-255059933
        setTimeout(() => setShowDayPicker(true), 0);
    };

    const hidePicker = () => {
        onBlur();
        setShowPopper(false);
        setShowDayPicker(false);
    };

    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const newStringValue = e.currentTarget.value;

        if (newStringValue) {
            const newDate = parseDate(newStringValue, dateFormat, new Date());

            if (isValidDate(newDate)) {
                const newDateAtMidDay = addHours(newDate, 12);
                onChange(newDateAtMidDay);
                setCustomValue(null);
            } else {
                console.error("INVALID");
                // TODO: Show error message??
                // onChange(null);
                // setCustomValue(null);
            }
        }
    };

    const onDateChange = (date: Date) => {
        onChange(date);
        hidePicker();
    };

    const rootClasses: string[] = [classes.root];
    if (disabled) rootClasses.push(classes.disabled);
    if (fullWidth) rootClasses.push(classes.fullWidth);

    return (
        <ClickAwayListener onClickAway={hidePicker}>
            <div ref={rootRef} className={rootClasses.join(" ")}>
                <InputBase
                    classes={{ root: classes.inputBase }}
                    endAdornment={showClearButton ? <ClearInputButton onClick={() => onChange(null)} disabled={!value} /> : undefined}
                    disabled={disabled}
                    placeholder={placeholderText}
                    value={displayValue}
                    onFocus={showPicker}
                    onBlur={onInputBlur}
                    inputProps={{
                        autoComplete: "off",
                        onKeyDown: (e) => {
                            if (e.key === "Tab") {
                                // Hide picker, if tab is pressed. This cannot be done in `onBlur` because the input-blur-event is also called,
                                // when clicking inside the picker and the picker would be hidden, before `onDateChange` could be called.
                                hidePicker();
                            }
                        },
                        ...inputProps,
                    }}
                    {...restProps}
                    {...restInput}
                />
                <Popper open={showPopper} anchorEl={rootRef.current} placement="bottom-start" keepMounted className={classes.popper} disablePortal>
                    <Paper>{showDayPicker && <Calendar date={value} onChange={onDateChange} />}</Paper>
                </Popper>
            </div>
        </ClickAwayListener>
    );
}

const DatePickerWithStyles = withStyles(styles, { name: "CometAdminDatePicker" })(DatePicker);

export { DatePickerWithStyles as FinalFormDatePicker };

declare module "@material-ui/core/styles/overrides" {
    interface ComponentNameToClassKey {
        CometAdminDatePicker: CometAdminDatePickerClassKeys;
    }
}

declare module "@material-ui/core/styles/props" {
    interface ComponentsPropsList {
        CometAdminDatePicker: DatePickerProps;
    }
}
