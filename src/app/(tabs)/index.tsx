import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { PokemonCard } from "../../components/PokemonCard";
import { getPokemonId } from "../../utils/pokemon";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export default function HomeScreen() {
  const [pokemonState, setPokemonState] = useState<PokemonListItem[]>([]);
  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
      const data: PokemonList = await response.json();
      setPokemonState(data.results);
    } catch (err) {
      console.log("Erreur lors du chargement des pokémons");
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header name="Pokedex" />
      <FlatList
        style={{ flex: 1 }}
        data={pokemonState}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} id={getPokemonId(item.url)} />
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
}
