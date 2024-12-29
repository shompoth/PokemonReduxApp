import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesState {
  favoriteIds: number[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      const index = state.favoriteIds.indexOf(pokemonId);

      if (index === -1) {
        state.favoriteIds.push(pokemonId);
        state.favoriteIds.sort((a, b) => a - b);
      } else {
        state.favoriteIds.splice(index, 1);
      }
      AsyncStorage.setItem("favorites", JSON.stringify(state.favoriteIds));
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
