import { View, Text } from "react-native";
import { Header } from "../../components/Header";

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header name="Favorites" />
      <Text>List of favories pokemon</Text>
    </View>
  );
}
