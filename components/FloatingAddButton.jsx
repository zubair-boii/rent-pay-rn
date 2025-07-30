import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { PlusIcon } from "phosphor-react-native"; // Optional icon lib

const FloatingAddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      {/* You can use text or icon */}
      <PlusIcon size={24} color="#0f172a" weight="bold" />
      {/* OR */}
      {/* <Text style={styles.fabText}>+</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#38bdf8", // Tailwind's sky-400
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  fabText: {
    color: "balck",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default FloatingAddButton;
