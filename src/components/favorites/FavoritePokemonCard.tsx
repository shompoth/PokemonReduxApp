import { ActivityIndicator } from "react-native";
import { useGetPokemonByIdQuery } from "../../store/services/pokemonApi";
import { PokemonCard } from "../shared/PokemonCard";

export const FavoritePokemonCard = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetPokemonByIdQuery(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!data) return null;

  return <PokemonCard id={data.id} name={data.name} />;
};
