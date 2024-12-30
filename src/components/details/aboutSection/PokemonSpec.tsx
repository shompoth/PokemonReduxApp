import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title?: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isLast?: boolean;
};

export const PokemonSpec = ({
  title,
  description,
  icon,
  isLast = false,
}: Props) => {
  return (
    <View style={[styles.container, !isLast && styles.rightBorder]}>
      <View style={styles.titleContainer}>
        {icon && (
          <Ionicons name={icon} size={24} color="black" style={styles.icon} />
        )}
        <Text>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  description: {
    fontWeight: "500",
  },
});
