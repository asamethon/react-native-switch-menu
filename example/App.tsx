import { SafeAreaView, Text, View } from "react-native";
import { SwitchMenu, SwitchMenuOption } from "react-native-switch-menu";
import { useState } from "react";

type TabOptions = "paid" | "clients";

export default function HomeScreen() {
  const [selectedOption, setSelectedOption] = useState<TabOptions>("paid");

  const options: SwitchMenuOption<TabOptions>[] = [
    { id: "paid", label: "Paid" },
    { id: "clients", label: "Clients" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <SwitchMenu
          options={options}
          defaultOption="paid"
          backgroundColor="#F6F6F6"
          onChange={setSelectedOption}
        />
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            {selectedOption === "paid" ? "Paid Tab" : "Clients Tab"}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F4F4F9"
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    marginTop: 10
  },
  boldText: {
    fontWeight: 'bold' as const
  }
};