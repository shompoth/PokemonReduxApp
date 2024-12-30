import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PokemonDetail,
  TransformedPokemonListResponse,
} from "../../types/pokemon";

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
        stats: response.stats,
      }),
      keepUnusedDataFor: 300,
    }),

    getPokemonSpecies: builder.query({
      query: (id) => `pokemon-species/${id}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByIdQuery,
  useGetPokemonSpeciesQuery,
} = pokemonApi;
