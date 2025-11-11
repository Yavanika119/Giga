import { Link, Text, View } from "expo-router";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Router Working!</Text>
      <Link href="/login" asChild>
        <Text style={styles.linkText}>Go To Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0F20",
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    marginBottom: 20,
  },
  linkText: {
    color: "#5AAFFF",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 20,
  },
});