import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Confetti from "react-native-confetti";

interface Props {
  win: boolean;
  initializeGame: () => void;
}

export default function WinMatch({ win, initializeGame }: Props) {
  const confettiRef = useRef<Confetti>(null);

  useEffect(() => {
    if (win && confettiRef.current) {
      confettiRef.current.startConfetti();
    }
  }, [win]);

  if (!win) return null;
  return (
    <View style={styles.overlay}>
      <Confetti ref={confettiRef} />
      <Text style={styles.winText}>You Win!</Text>
      <TouchableOpacity style={styles.nextButton} onPress={initializeGame}>
        <Text style={styles.playButtonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 10,
  },
  winText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  playButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
