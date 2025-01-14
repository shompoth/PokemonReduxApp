import {
  getPokemonArtwork,
  getPokemonIdDisplay,
  getPokemonId,
  formatWeight,
  formatSize,
  statShortName,
} from "../pokemon";

describe("Pokemon Utilities", () => {
  describe("getPokemonArtwork", () => {
    it("should return the correct artwork URL", () => {
      const id = 25;
      const expectedUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
      expect(getPokemonArtwork(id)).toBe(expectedUrl);
    });
  });

  describe("getPokemonIdDisplay", () => {
    it("should format ID with leading zeros", () => {
      expect(getPokemonIdDisplay("1")).toBe("#0001");
      expect(getPokemonIdDisplay("25")).toBe("#0025");
      expect(getPokemonIdDisplay("150")).toBe("#0150");
      expect(getPokemonIdDisplay("2510")).toBe("#2510");
    });
  });

  describe("getPokemonId", () => {
    it("should extract ID from URL", () => {
      const url = "https://pokeapi.co/api/v2/pokemon/25/";
      expect(getPokemonId(url)).toBe(25);
    });
  });

  describe("formatWeight", () => {
    it("should format weight correctly", () => {
      expect(formatWeight(60)).toBe("6 kg");
      expect(formatWeight(75)).toBe("7,5 kg");
      expect(formatWeight(100)).toBe("10 kg");
      expect(formatWeight(undefined)).toBe("--");
    });
  });

  describe("formatSize", () => {
    it("should format size correctly", () => {
      expect(formatSize(7)).toBe("0,7 m");
      expect(formatSize(17)).toBe("1,7 m");
      expect(formatSize(undefined)).toBe("--");
    });
  });

  describe("statShortName", () => {
    it("should format stat names correctly", () => {
      expect(statShortName("special-attack")).toBe("SATK");
      expect(statShortName("special-defense")).toBe("SDEF");
      expect(statShortName("speed")).toBe("SPD");
    });
  });
});
