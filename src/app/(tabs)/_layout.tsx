import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Pokedex",
            tabBarLabel: "Pokedex",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="pokeball"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="bookmark-border" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
