import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hi, Pokémon {id}</Text>
    </View>
  );
}
