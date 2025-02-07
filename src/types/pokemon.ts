export interface PokemonBase {
  name: string;
  url: string;
}

export interface StatDetail {
  base_stat: number;
  stat: {
    name: string;
    url?: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
  types: string[];
  stats: StatDetail[];
}

export interface TransformedPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBase[];
  currentPage: number;
}

export interface RawPokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: TypeDetail[];
  stats: StatDetail[];
}

export interface TypeDetail {
  type: {
    name: string;
  };
}
