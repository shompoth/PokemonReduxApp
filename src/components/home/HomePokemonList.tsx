import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PokemonCard } from "../shared/PokemonCard";
import { getPokemonId } from "../../utils/pokemon";
import { PokemonBase } from "../../types/pokemon";

type HomeListProps = {
  data: PokemonBase[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  search: string;
  onRetry?: () => void;
  onEndReached?: () => void;
};

export const HomePokemonList = ({
  data,
  isFetching,
  isLoading,
  isError,
  search,
  onRetry,
  onEndReached,
}: HomeListProps) => {
  const filteredPokemons = search
    ? data?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : data;

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text>Une erreur est survenue</Text>
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      data={filteredPokemons}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      renderItem={({ item }) => (
        <PokemonCard name={item.name} id={getPokemonId(item.url)} />
      )}
      ListFooterComponent={
        <>
          {isFetching && <ActivityIndicator />}
          <View style={{ paddingBottom: 2 }} />
        </>
      }
      keyExtractor={(item) => item.name.toString()}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
});
