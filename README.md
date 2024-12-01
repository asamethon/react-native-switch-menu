# React Native Switch Menu

A customizable animated switch menu component for React Native.

https://github.com/user-attachments/assets/3e83e6f7-7fcc-4f90-830b-e61e33053de5

## Installation

```bash
npm install react-native-switch-menu
```

or

```bash
yarn add react-native-switch-menu
```

## Usage



```js
import { SafeAreaView, Text, View } from "react-native";
import { SwitchMenu, SwitchMenuOption } from "react-native-switch-menu";
import { useState } from "react";

type TabOptions = "tab-1" | "tab-2";

export default function HomeScreen() {
  const [selectedOption, setSelectedOption] = useState<TabOptions>("tab-1");

  const options: SwitchMenuOption<TabOptions>[] = [
    { id: "tab-1", label: "Tab 1" },
    { id: "tab-2", label: "Tab 2" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <SwitchMenu
          options={options}
          defaultOption="tab-1"
          backgroundColor="#F6F6F6"
          onChange={setSelectedOption}
        />
        <Text>{selectedOption === "tab-1" ? "Tab 1" : "Tab 2"}</Text>
      </View>
    </SafeAreaView>
  );
}
```
