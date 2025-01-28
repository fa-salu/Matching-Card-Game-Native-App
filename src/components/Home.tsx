import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/Navigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Memory Match</Text>
        <Text style={styles.subtitle}>Challenge Your Brain!</Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.playButtonText}>PLAY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 40,
  },
  playButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
  },
  playButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
