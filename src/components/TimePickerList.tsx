import React, { useState } from "react";
import { List, Stack, Text, mergeStyleSets } from "@fluentui/react";
import dayjs from "dayjs";

// Assuming you have imported dayjs library
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const getClassNames = () => {
  return mergeStyleSets({
    list: {
      height: 200,
      overflow: "auto",
    },
    listItem: {
      padding: "5px 10px",
    },
    time: {
      width: "40px !important",
    },
  });
};

const HoursOfDayList = ({
  defaultSelectedTime = 1,
  setSelectedTime,
  timeFormat,
}: any) => {
  const classes = getClassNames();

  // Create an array to store the hours of the day
  const allHours = [];

  // Loop through the hours from 0 to 23
  for (let hour = 0; hour < 24; hour++) {
    // Create a dayjs object for the current hour
    const hourOfDay = dayjs().hour(hour).minute(0).second(0).millisecond(0);

    // Format the hourOfDay in 12-hour format with AM/PM
    const formattedHour = hourOfDay.format(timeFormat);

    // Add the formattedHour to the array
    allHours.push(formattedHour);
  }

  // Create an array of hours from 1 to 24
  const hoursOfDay = allHours.map((time: string, index: number) => ({
    key: time,
    text: time,
  }));

  const [selectedItems, setSelectedItems] = useState([
    { key: defaultSelectedTime },
  ]);

  const handleItemClick = (item) => {
    // For Mulptiple Selctions
    // const isSelected = selectedItems.some(
    //   (selectedItem) => selectedItem.key === item.key
    // );
    // if (isSelected) {
    //   setSelectedItems(
    //     selectedItems.filter((selectedItem) => selectedItem.key !== item.key)
    //   );
    // } else {
    //   setSelectedItems([...selectedItems, item]);
    // }

    // Single Selection
    setSelectedItems([item]);
    setSelectedTime(item.text);
  };

  return (
    <>
      <List
        className={classes.list}
        items={hoursOfDay}
        onRenderCell={(item) => {
          const isSelected = selectedItems.some(
            (selectedItem) => selectedItem.key === item.key
          );
          return (
            <Stack
              className={classes.listItem}
              style={{
                background: isSelected ? "lightblue" : "white",
                cursor: "pointer",
              }}
            >
              <Text
                style={{ fontWeight: isSelected && 600 }}
                onClick={() => handleItemClick(item)}
              >
                {item.text}
              </Text>
            </Stack>
          );
        }}
      />
    </>
  );
};

export default HoursOfDayList;
