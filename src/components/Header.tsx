import { View, Image, Text, StyleSheet } from "react-native";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/pokemon-logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Pokédex</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  text: {
    fontWeight: "bold",
  },
});
