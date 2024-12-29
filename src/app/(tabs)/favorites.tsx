import { View, FlatList } from "react-native";
import { Header } from "../../components/shared/Header";
import { useAppSelector } from "../../store/hooks";
import { FavoritePokemonCard } from "../../components/favorites/FavoritePokemonCard";

export default function FavoritesScreen() {
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);

  return (
    <View style={{ flex: 1 }}>
      <Header name="Favorites" />
      <FlatList
        style={{ flex: 1 }}
        data={favoriteIds}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        renderItem={({ item: id }) => <FavoritePokemonCard id={id} />}
        keyExtractor={(id) => id.toString()}
      />
    </View>
  );
}
