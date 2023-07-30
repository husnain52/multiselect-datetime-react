import React, { useState } from "react";
import {
  Dropdown,
  FontIcon,
  ICalendarDayProps,
  Label,
  PrimaryButton,
  Stack,
  Text,
  TooltipHost,
  mergeStyleSets,
} from "@fluentui/react";
import {
  Calendar,
  FocusTrapZone,
  Callout,
  DirectionalHint,
  defaultCalendarStrings,
} from "@fluentui/react";
import dayjs from "dayjs";
import { useId } from "@fluentui/react-hooks";
import HoursOfDayList from "./TimePickerList";

const getClassNames = () => {
  return mergeStyleSets({
    combo: {
      ".ms-Dropdown, .ms-Dropdown-title": {
        width: "35em",
        minHeight: "35px",
        height: "auto",
      },
      ".ms-Dropdown-caretDownWrapper": {
        width: "22px",
      },
    },
    icon: {},
    title: {
      background: "#F3F2F1",
      margin: "4px",
      padding: "0px 5px",
      width: "12em",
    },
  });
};

const calendarDayProps: Partial<ICalendarDayProps> = {
  customDayCellRef: (element, date, classNames) => {
    if (element) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        classNames.dayOutsideBounds &&
          element.classList.add(classNames.dayOutsideBounds);
        (element.children[0] as HTMLButtonElement).disabled = true;
      }
    }
  },
};

const DateTimePicker = () => {
  const classes = getClassNames();
  const dateFormat = "MM/DD/YYYY";
  const timeFormat = "hh:00 A";
  const [visible, setVisible] = useState<any>(false);
  const [selectedDate, setselectedDate] = useState<any>(
    dayjs().format(dateFormat)
  );
  const [selectedTime, setSelectedTime] = useState<any>(
    dayjs().format(timeFormat)
  );
  const [selectedDateTimes, setSelectedDateTimes] = useState<any[]>([]);

  const buttonContainerRef = React.useRef<HTMLDivElement>(null);

  const onSelectDate = React.useCallback(
    (date: Date, dateRangeArray: Date[]): void => {
      setselectedDate(dayjs(date).format(dateFormat));
    },
    []
  );

  const handleSubmit = () => {
    selectedDateTimes.push({
      key: `${selectedDate} ${selectedTime} ${Math.random()}`,
      text: `${selectedDate} ${selectedTime}`,
    });
    setSelectedDateTimes(selectedDateTimes);
    setselectedDate(dayjs().format(dateFormat));
    setSelectedTime(dayjs().format(timeFormat));
    setVisible(false);
  };

  const tooltipId = useId("tooltip");

  return (
    <div ref={buttonContainerRef}>
      <Dropdown
        className={classes.combo}
        label="Dropdown with Multi-Select"
        placeholder="Select a date and time"
        multiSelect
        options={selectedDateTimes}
        selectedKeys={selectedDateTimes.map((item) => item.key)}
        onRenderCaretDown={() => (
          <FontIcon
            aria-label="Calendar"
            iconName="Calendar"
            className={classes.icon}
            onClick={() => setVisible(!visible)}
          />
        )}
        onRenderList={() => null}
        onRenderTitle={(items) => (
          <Stack horizontal wrap tokens={{ childrenGap: 2 }}>
            {items.map((item, key) => (
              <Stack
                key={key}
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
                tokens={{ childrenGap: 2 }}
                className={classes.title}
              >
                <Text>{item.text}</Text>
                <FontIcon
                  aria-label="Cancel"
                  iconName="Cancel"
                  className={classes.icon}
                  onClick={() => {
                    setSelectedDateTimes(
                      selectedDateTimes.filter((x) => x.key !== item.key)
                    );
                  }}
                />
              </Stack>
            ))}
          </Stack>
        )}
        onRenderLabel={(label) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
            <Stack.Item>
              <Label aria-describedby={tooltipId}>{label.label} </Label>
            </Stack.Item>
            <Stack.Item style={{ height: "15px" }}>
              <TooltipHost
                id={tooltipId}
                content="Click on Calendar to add date/time."
              >
                <FontIcon
                  aria-label="Info"
                  iconName="Info"
                  aria-describedby={tooltipId}
                />
              </TooltipHost>
            </Stack.Item>
          </Stack>
        )}
      />

      {visible && (
        <Callout
          isBeakVisible={false}
          gapSpace={0}
          doNotLayer={false}
          target={buttonContainerRef}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={() => setVisible(false)}
          setInitialFocus
        >
          <FocusTrapZone isClickableOutsideFocusTrap>
            <Stack
              tokens={{ padding: 15, childrenGap: 25 }}
              horizontalAlign="end"
            >
              <Stack.Item>
                <Calendar
                  onSelectDate={onSelectDate}
                  onDismiss={() => setVisible(false)}
                  isMonthPickerVisible
                  highlightCurrentMonth
                  isDayPickerVisible
                  showGoToToday
                  strings={defaultCalendarStrings}
                  // disable weekends
                  calendarDayProps={calendarDayProps}
                />
              </Stack.Item>
              <Stack.Item style={{ width: "100%" }}>
                <HoursOfDayList
                  defaultSelectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  timeFormat={timeFormat}
                />
              </Stack.Item>
              <Stack.Item>
                <PrimaryButton onClick={handleSubmit}>+ Add</PrimaryButton>
              </Stack.Item>
            </Stack>
          </FocusTrapZone>
        </Callout>
      )}
    </div>
  );
};

export default DateTimePicker;
