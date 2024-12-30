import { View, Text, StyleSheet } from "react-native";

import { PokemonDetail } from "../../../types/pokemon";
import { formatSize, formatWeight } from "../../../utils/pokemon";
import { PokemonSpec } from "./PokemonSpec";

type Props = {
  pokemon: PokemonDetail | undefined;
  bio?: string;
};

export const AboutSection = ({ pokemon, bio }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View style={styles.specsContainer}>
        <PokemonSpec
          title={formatWeight(pokemon?.weight)}
          icon="barbell-outline"
          description="Weight"
        />
        <PokemonSpec
          title={formatSize(pokemon?.height)}
          icon="resize-outline"
          description="Size"
          isLast
        />
      </View>
      <View>
        {bio ? (
          <Text style={styles.bio}>{bio}</Text>
        ) : (
          <View style={styles.bioPlaceholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 8,
  },
  specsContainer: {
    flexDirection: "row",
  },
  bio: {
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "500",
    fontSize: 16,
  },
  bioPlaceholder: {
    height: 40,
    marginVertical: 24,
  },
});
