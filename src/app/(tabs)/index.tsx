import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { PokemonCard } from "../../components/PokemonCard";

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
  const [pokemonState, setPokemonState] = useState<PokemonListItem[]>([]); // On spécifie le type ici
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

  console.log("pokemonState", pokemonState);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        style={{ flex: 1 }}
        data={pokemonState}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        renderItem={({ item, index }) => (
          <PokemonCard name={item.name} id={index + 1} />
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
}
