import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "../store";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFavorites } from "../store/slices/favoritesSlice";
import { Provider } from "react-redux";

export default function RootLayout() {
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          store.dispatch(setFavorites(JSON.parse(storedFavorites)));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </Provider>
  );
}
