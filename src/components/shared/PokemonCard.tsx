import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { getPokemonArtwork, getPokemonIdDisplay } from "../../utils/pokemon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type Props = {
  name: string;
  id: number;
  isLoading?: boolean;
};

export const PokemonCard = ({ name, id, isLoading = false }: Props) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.favoriteIds.includes(id)
  );

  return (
    <Link
      href={{
        pathname: "/pokemon/[id]",
        params: { id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <View style={styles.card}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text style={styles.idText}>
                {getPokemonIdDisplay(id.toString())}
              </Text>
              <TouchableOpacity
                style={styles.icon}
                onPress={(e) => {
                  dispatch(toggleFavorite(id));
                }}
              >
                {isFavorite ? (
                  <FontAwesome name="heart" size={24} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={24} color="#6B7280" />
                )}
              </TouchableOpacity>
              <Image
                source={{
                  uri: getPokemonArtwork(id),
                }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.name}>{name}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "46%",
    margin: 8,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    position: "relative",
    aspectRatio: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  idText: {
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#6B7280",
  },
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  image: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
  name: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: 8,
    textTransform: "capitalize",
  },
});
