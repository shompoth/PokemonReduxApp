import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Link } from "expo-router";
import { getPokemonArtwork, getPokemonIdDisplay } from "../utils/pokemon";

type Props = {
  name: string;
  id: number;
};

export const PokemonCard = ({ name, id }: Props) => {
  return (
    <Link
      href={{
        pathname: "/pokemon/[id]",
        params: { id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.idText}>
            {getPokemonIdDisplay(id.toString())}
          </Text>
          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "46%",
    margin: 8,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    position: "relative",
    aspectRatio: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  idText: {
    position: "absolute",
    top: 8,
    right: 8,
    fontWeight: "bold",
    color: "#6B7280",
  },
  image: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
  name: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: 8,
    textTransform: "capitalize",
  },
});
