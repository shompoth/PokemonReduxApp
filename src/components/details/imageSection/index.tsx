import { Image, View, StyleSheet } from "react-native";
import { PokemonType } from "./PokemonType";
import { getPokemonArtwork } from "../../../utils/pokemon";

type Props = {
  id: string;
  types?: string[];
};

export const ImageSection = ({ types, id }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: getPokemonArtwork(id) }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.typesContainer}>
        {!!types?.length ? (
          types.map((type) => <PokemonType key={type} name={type} />)
        ) : (
          <View style={styles.placeholderType} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  image: {
    aspectRatio: 1,
    width: "50%",
    alignSelf: "center",
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 16,
  },
  placeholderType: {
    height: 40,
    width: 40,
    padding: 8,
    margin: 8,
  },
});
