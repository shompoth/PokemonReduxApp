import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet } from "react-native";

type Props = {
  searchText: string;
  isEditable: boolean;
  onChange: (s: string) => void;
};

export const SearchBar = ({ searchText, isEditable, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={24} color="#71717a" />
      </View>
      <TextInput
        style={[styles.input, !isEditable && styles.disabledInput]}
        value={searchText}
        onChangeText={onChange}
        placeholder="Search for a Pokemon..."
        editable={isEditable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  disabledInput: {
    opacity: 0.5,
  },
});
