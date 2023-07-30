import React from "react";
import {
  Stack,
  Text,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  initializeIcons,
} from "@fluentui/react";
import "./App.css";
import DateTimePicker from "./components/DateTimePicker";

const boldStyle: Partial<ITextStyles> = {
  root: { fontWeight: FontWeights.semibold },
};
const stackTokens: IStackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "20px auto",
    color: "#605e5c",
  },
};

export const App: React.FunctionComponent = () => {
  initializeIcons();
  return (
    <Stack
      horizontalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}
    >
      <Stack.Item>
        <Text variant="xxLarge" styles={boldStyle}>
          Welcome to your Fluent UI app
        </Text>
      </Stack.Item>

      <Stack.Item>
        <DateTimePicker />
      </Stack.Item>
    </Stack>
  );
};
