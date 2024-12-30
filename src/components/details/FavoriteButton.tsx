import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

type FavoriteButtonProps = {
  pokemonId: number;
};

export const FavoriteButton = ({ pokemonId }: FavoriteButtonProps) => {
  const dispatch = useDispatch();

  const isFavorite = useAppSelector((state) =>
    state.favorites.favoriteIds.includes(pokemonId)
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(pokemonId));
  };

  return (
    <View style={[styles.buttonContainer]}>
      <TouchableOpacity style={[styles.button]} onPress={handleToggleFavorite}>
        <Text
          style={[
            styles.buttonText,
            isFavorite ? styles.buttonTextRemove : styles.buttonTextAdd,
          ]}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  buttonTextAdd: {
    color: "#22c55e",
  },
  buttonTextRemove: {
    color: "#ef4444",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
