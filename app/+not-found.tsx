import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFound() {
  return (
    <>
        <Stack.Screen options={{ title: "Oops! Not Found" }} />
        <View
            style={styles.container}
            >
            <Link href="/" style={styles.button}>Go to Home</Link>
        </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
