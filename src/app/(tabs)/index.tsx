import { View } from "react-native";
import { useState } from "react";
import { Header } from "../../components/shared/Header";
import { useGetPokemonListQuery } from "../../store/services/pokemonApi";
import { HomePokemonList } from "../../components/home/HomePokemonList";
import { SearchBar } from "../../components/home/SearchBar";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isFetching, isLoading, isError, refetch } =
    useGetPokemonListQuery(page);

  const loadMore = () => {
    if (data?.next && search.length === 0) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header name="Pokedex" />
      <SearchBar
        searchText={search}
        isEditable={!isFetching && !isError}
        onChange={setSearch}
      />
      <HomePokemonList
        data={data?.results}
        isFetching={isFetching}
        isLoading={isLoading}
        isError={isError}
        search={search}
        onEndReached={loadMore}
        onRetry={refetch}
      />
    </View>
  );
}
