import { View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  useGetPokemonByIdQuery,
  useGetPokemonSpeciesQuery,
} from "../../store/services/pokemonApi";
import { Header } from "../../components/details/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageSection } from "../../components/details/imageSection";
import { AboutSection } from "../../components/details/aboutSection";
import { basePokemonStats } from "../../constants/pokemon";
import { StatsSection } from "../../components/details/statsSection";
import { FavoriteButton } from "../../components/details/FavoriteButton";

type SearchParams = {
  id: string;
};

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<SearchParams>();
  const { data: pokemon } = useGetPokemonByIdQuery(Number(id));

  const { data: species } = useGetPokemonSpeciesQuery(Number(id));

  const bio = species?.flavor_text_entries
    ?.find(
      ({ language }: { language: { name: string } }) => language.name === "en"
    )
    ?.flavor_text.replace(/\n/g, " ")
    .replace(/\f/g, " ");

  const stats = pokemon?.stats ?? basePokemonStats;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header name={pokemon?.name} id={id} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ImageSection types={pokemon?.types} id={id} />
            <AboutSection pokemon={pokemon} bio={bio} />
            <StatsSection stats={stats} />
            <FavoriteButton pokemonId={Number(id)} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
