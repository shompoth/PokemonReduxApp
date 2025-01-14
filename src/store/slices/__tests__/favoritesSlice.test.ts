import favoritesReducer, {
  toggleFavorite,
  setFavorites,
} from "../favoritesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("favoritesSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial state", () => {
    it("should have an empty array as initial state", () => {
      const initialState = favoritesReducer(undefined, { type: "" });
      expect(initialState).toEqual({ favoriteIds: [] });
    });
  });

  describe("toggleFavorite", () => {
    it("should add a pokemon to favorites", () => {
      const initialState = { favoriteIds: [] };
      const newState = favoritesReducer(initialState, toggleFavorite(25));

      expect(newState.favoriteIds).toContain(25);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", "[25]");
    });

    it("should remove a pokemon from favorites", () => {
      const initialState = { favoriteIds: [25, 1] };
      const newState = favoritesReducer(initialState, toggleFavorite(25));

      expect(newState.favoriteIds).not.toContain(25);
      expect(newState.favoriteIds).toEqual([1]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", "[1]");
    });

    it("should maintain sorted list when adding multiple pokemons", () => {
      const initialState = { favoriteIds: [1, 5] };
      let state = favoritesReducer(initialState, toggleFavorite(3));
      state = favoritesReducer(state, toggleFavorite(2));
      state = favoritesReducer(state, toggleFavorite(4));

      expect(state.favoriteIds).toEqual([1, 2, 3, 4, 5]);
      expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
        "favorites",
        "[1,2,3,4,5]"
      );
    });

    it("should handle duplicates correctly", () => {
      const initialState = { favoriteIds: [1, 2, 3] };
      const state = favoritesReducer(initialState, toggleFavorite(2));

      expect(state.favoriteIds).toEqual([1, 3]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("favorites", "[1,3]");
    });
  });

  describe("setFavorites", () => {
    it("should completely replace the favorites list", () => {
      const initialState = { favoriteIds: [1, 2, 3] };
      const newFavorites = [4, 5, 6];
      const state = favoritesReducer(initialState, setFavorites(newFavorites));

      expect(state.favoriteIds).toEqual(newFavorites);
    });

    it("should accept an empty list", () => {
      const initialState = { favoriteIds: [1, 2, 3] };
      const state = favoritesReducer(initialState, setFavorites([]));

      expect(state.favoriteIds).toEqual([]);
    });

    it("should handle unsorted lists", () => {
      const initialState = { favoriteIds: [] };
      const state = favoritesReducer(initialState, setFavorites([3, 1, 2]));

      expect(state.favoriteIds).toEqual([3, 1, 2]); // setFavorites ne trie pas automatiquement
    });
  });

  describe("AsyncStorage interaction", () => {
    it("should interact with AsyncStorage correctly", async () => {
      // Simuler une valeur retournée par getItem
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue("[1,2,3]");

      const result = await AsyncStorage.getItem("favorites");
      expect(result).toBe("[1,2,3]");
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("favorites");
    });
  });
});
