import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type SwitchMenuOption = {
  id: string;
  label: string;
};

interface SwitchMenuProps {
  options: SwitchMenuOption[];
  defaultOption?: string;
  onChange?: (option: string) => void;
  activeTextColor?: string;
  inactiveTextColor?: string;
  backgroundColor?: string;
  selectorColor?: string;
  animationDuration?: number;
}

export const SwitchMenu: React.FC<SwitchMenuProps> = ({
  options,
  defaultOption,
  onChange,
  activeTextColor = "#000000",
  inactiveTextColor = "rgba(0,0,0,0.5)",
  backgroundColor = "#cccccc",
  selectorColor = "#ffffff",
  animationDuration = 300,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption || options[0].id);
  const refs = useRef<{ [key: string]: View | null }>({});

  const translateX = useSharedValue(0);
  const selectorWidth = useSharedValue(0);

  const handlePress = (optionId: string, index: number, buttonWidth: number) => {
    setSelectedOption(optionId);
    onChange?.(optionId);
    selectorWidth.value = withTiming(buttonWidth, { duration: animationDuration });
    translateX.value = withTiming(index * buttonWidth, { duration: animationDuration });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: selectorWidth.value,
  }));

  const handleLayout = (
    event: any,
    optionId: string,
    index: number,
  ) => {
    const { width } = event.nativeEvent.layout;
    if (optionId === selectedOption) {
      selectorWidth.value = withTiming(width, { duration: animationDuration });
      translateX.value = withTiming(index * width, { duration: animationDuration });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.animatedSelector, animatedStyle, { backgroundColor: selectorColor }]} />
      {options.map((option, index) => (
        <View
          key={option.id}
          ref={(ref) => (refs.current[option.id] = ref)}
          onLayout={(event) => handleLayout(event, option.id, index)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.touchable}
            onPress={() =>
              refs.current[option.id]?.measure((_x, _y, width) =>
                handlePress(option.id, index, width),
              )
            }
          >
            <Text
              style={[
                styles.text,
                {
                  color: selectedOption === option.id ? activeTextColor : inactiveTextColor,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 12,
  },
  animatedSelector: {
    position: "absolute",
    height: "100%",
    borderRadius: 12,
    left: 2,
    zIndex: -1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 24,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});