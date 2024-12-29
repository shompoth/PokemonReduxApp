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
import { PokemonBasic } from "../../store/services/pokemonApi";

type HomeListProps = {
  data: PokemonBasic[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  onEndReached?: () => void;
};

export const HomePokemonList = ({
  data,
  isLoading,
  isError,
  onRetry,
  onEndReached,
}: HomeListProps) => {
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
      data={data}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "center" }}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      renderItem={({ item }) => (
        <PokemonCard name={item.name} id={getPokemonId(item.url)} />
      )}
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
