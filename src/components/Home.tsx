import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/Navigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [bounceAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1.1,
          friction: 1,
          tension: 10,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.titleContainer}>
        <Animated.Text
          style={[styles.titleTop, { transform: [{ scale: bounceAnim }] }]}
        >
          Memory
        </Animated.Text>
        <Animated.Text
          style={[styles.titleBottom, { transform: [{ scale: bounceAnim }] }]}
        >
          Match
        </Animated.Text>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.playText}>Play</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
  titleTop: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
    letterSpacing: 2,
  },
  titleBottom: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
    letterSpacing: 2,
  },
  playButton: {
    backgroundColor: "#F59E0B",
    width: width * 0.4,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#78350F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
  playText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#78350F",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});
