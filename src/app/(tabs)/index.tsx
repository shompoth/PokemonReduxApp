import { View, FlatList } from "react-native";
import { useState } from "react";
import { Header } from "../../components/Header";
import { useGetPokemonListQuery } from "../../store/services/pokemonApi";
import { PokemonCard } from "../../components/PokemonCard";
import { getPokemonId } from "../../utils/pokemon";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetPokemonListQuery(page);

  const loadMore = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name="Pokedex" />
      <FlatList
        style={{ flex: 1 }}
        data={data?.results}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} id={getPokemonId(item.url)} />
        )}
        keyExtractor={(item) => item.name.toString()}
        onEndReached={loadMore}
      />
    </View>
  );
}
