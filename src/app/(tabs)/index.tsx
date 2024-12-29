import { View } from "react-native";
import { useState } from "react";
import { Header } from "../../components/shared/Header";
import { useGetPokemonListQuery } from "../../store/services/pokemonApi";
import { HomePokemonList } from "../../components/home/HomePokemonList";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetPokemonListQuery(page);

  const loadMore = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name="Pokedex" />
      <HomePokemonList
        data={data?.results}
        isLoading={isLoading}
        isError={isError}
        onEndReached={loadMore}
        onRetry={refetch}
      />
    </View>
  );
}
