import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useGetPokemonByIdQuery } from "../../store/services/pokemonApi";
import { PokemonCard } from "../shared/PokemonCard";

export const FavoritePokemonCard = ({ id }: { id: number }) => {
  const { data, isLoading, isError, refetch } = useGetPokemonByIdQuery(id);

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Une erreur est survenue</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data) return null;

  return <PokemonCard id={data.id} name={data.name} isLoading={isLoading} />;
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 8,
    paddingVertical: 16,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    margin: 8,
    alignItems: "center",
  },
  errorText: {
    color: "#dc2626",
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryText: {
    color: "white",
    fontWeight: "500",
  },
});
