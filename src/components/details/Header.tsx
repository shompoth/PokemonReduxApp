import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { getPokemonIdDisplay } from "../../utils/pokemon";

type Props = {
  name?: string;
  id: string;
};

export const Header = ({ name, id }: Props) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        hitSlop={20}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.pokemonId}>{getPokemonIdDisplay(id)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    paddingRight: 16,
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 20,
  },
  largeTitle: {
    fontSize: 24,
  },
  pokemonId: {
    color: "#6B7280",
    fontWeight: "bold",
  },
});
