import { View, Text, StyleSheet } from "react-native";
import { PokemonStat } from "./PokemonStat";
import { StatDetail } from "../../../types/pokemon";

type Props = {
  stats: StatDetail[];
};

export const StatsSection = ({ stats }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Base Stats</Text>
      {stats.map((stat) => (
        <PokemonStat
          key={stat.stat.name}
          name={stat.stat.name}
          value={stat.base_stat}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 8,
  },
});
