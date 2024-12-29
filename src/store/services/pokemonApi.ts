import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PokemonBasic {
  name: string;
  url: string;
}

interface TransformedPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
  currentPage: number;
}

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats: {
    name: string;
    value: number;
  }[];
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonList: builder.query<TransformedPokemonListResponse, number>({
      query: (page = 1) => `pokemon?limit=20&offset=${(page - 1) * 20}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (!currentCache) {
          return newItems;
        }
        return {
          ...newItems,
          results: [...currentCache.results, ...newItems.results],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 300,
    }),

    getPokemonById: builder.query<PokemonDetail, number>({
      query: (id) => `pokemon/${id}`,
      transformResponse: (response: any) => ({
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        height: response.height,
        weight: response.weight,
        types: response.types.map((t: any) => t.type.name),
        stats: response.stats.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      }),
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
