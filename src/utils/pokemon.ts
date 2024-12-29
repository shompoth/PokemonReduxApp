export const getPokemonArtwork = (id: number | string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getPokemonIdDisplay = (id: string): string => {
  return `#${id.padStart(4, "0")}`;
};

export const getPokemonId = (url: string): number => {
  return parseInt(url.split("/").at(-2)!, 10);
};
