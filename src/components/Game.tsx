import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LevelSelector } from "./LevelSelector";
import { GameGrid } from "./GameGrid";
import Icon from "react-native-vector-icons/MaterialIcons";
import WinMatch from "./WinMatch";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

const IMAGES = {
  cat: require("../../assets/images/cat.jpg"),
  dog: require("../../assets/images/dog.jpg"),
  elephant: require("../../assets/images/elephant.jpg"),
  rabbit: require("../../assets/images/rabbit.jpg"),
  rat: require("../../assets/images/rat.jpg"),
  robot: require("../../assets/images/robot.jpg"),
  tiger: require("../../assets/images/tiger.jpg"),
  whiteTiger: require("../../assets/images/white-tiger.jpg"),
};

const BACKGROUND_IMAGE = require("../../assets/images/bg.jpg");

export default function Game() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [click, setClick] = useState(0);
  const [maxMoves, setMaxMoves] = useState(60);
  const [selectedLevel, setSelectedLevel] = useState("Easy");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  const initializeGame = () => {
    const memoryImages = Object.keys(IMAGES);
    const shuffledCards = [...memoryImages, ...memoryImages].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setClick(0);
    setGameOver(false);
    setWin(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
        if (solved.length + 2 === cards.length) {
          setWin(true);
        }
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(checkForMatch, 300);
    }
  }, [cards, flipped, solved]);

  const handleCardPress = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2 && click < maxMoves) {
      setClick(click + 1);
      setFlipped([...flipped, index]);
    }
  };

  const winMatch = solved.length === cards.length;
  const gameOverCondition = click >= maxMoves && !winMatch;

  useEffect(() => {
    if (gameOverCondition) {
      setGameOver(true);
    }
  }, [gameOverCondition]);

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <WinMatch win={win} initializeGame={initializeGame} />

        <View style={styles.homeButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icon name="home" size={24} style={styles.homeButton} />
          </TouchableOpacity>
        </View>

        <LevelSelector
          click={click}
          setMaxMoves={setMaxMoves}
          initializeGame={initializeGame}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />

        <GameGrid
          cards={cards}
          flipped={flipped}
          solved={solved}
          images={IMAGES}
          onCardPress={handleCardPress}
        />

        {gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={initializeGame}
            >
              <Icon name="refresh" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {!gameOver && (
          <TouchableOpacity style={styles.resetButton} onPress={initializeGame}>
            <Icon name="refresh" size={32} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  homeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  homeButton: {
    backgroundColor: "#13155A",
    borderRadius: 10,
    margin: 6,
    padding: 4,
    color: "white",
  },
  resetButton: {
    marginTop: 20,
    padding: 7,
    backgroundColor: "#13155A",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverContainer: {
    position: "absolute",
    top: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  gameOverText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
