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
import { Text, View } from "react-native";
import { SwitchMenu } from "react-native-switch-menu";
import { useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("tab-1");
  const options = [
    { id: "tab-1", label: "Tab 1" },
    { id: "tab-2", label: "Tab 2" },
  ];

  return (
    <View>
      <SwitchMenu
        onChange={(option) => setSelectedOption(option)}
        options={options}
        defaultOption="tab-1"
        backgroundColor="#F6F6F6" // default
        selectorColor="#FFFFFF" // default
      />
    </View>
  );
}
```
