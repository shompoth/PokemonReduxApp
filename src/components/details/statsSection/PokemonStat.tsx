import { ViewProps, View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { statShortName } from "../../../utils/pokemon";
import { useEffect } from "react";

type Props = ViewProps & {
  name: string;
  value: number;
};

export const PokemonStat = ({ name, value }: Props) => {
  const max = 255;
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming((value / max) * 100, {
      duration: 1000,
    });
  }, [value]);

  const animatedStyles = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: `${width.value}%`,
    backgroundColor: "#FF6B00",
    borderRadius: 4,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.label}>{statShortName(name)}</Text>
      </View>
      <Text style={styles.value}>{value.toString().padStart(3, "0")}</Text>
      <View style={styles.barContainer}>
        <View style={styles.backgroundBar} />
        <Animated.View style={animatedStyles} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  nameContainer: {
    alignItems: "center",
    borderRightWidth: 2,
    borderRightColor: "#d1d5db",
  },
  label: {
    width: 50,
    fontSize: 14,
    textAlign: "right",
    paddingRight: 8,
  },
  value: {
    width: 40,
    fontSize: 14,
    textAlign: "right",
    paddingRight: 8,
  },
  barContainer: {
    flex: 1,
    height: 8,
    position: "relative",
  },
  backgroundBar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FFE4D6",
    borderRadius: 4,
  },
});
