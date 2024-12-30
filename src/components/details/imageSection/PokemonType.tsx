import { View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
};

export const PokemonType = ({ name }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "white",
  },
  text: {
    color: "#6B7280",
    textTransform: "capitalize",
    fontWeight: "600",
  },
});
