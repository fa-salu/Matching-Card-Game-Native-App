import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";

interface CardProps {
  index: number;
  isFlipped: boolean;
  isSolved: boolean;
  image: any;
  onPress: () => void;
}

export const Card: React.FC<CardProps> = ({
  isFlipped,
  isSolved,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, (isFlipped || isSolved) && styles.cardFlipped]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isFlipped || isSolved ? (
        <Image source={image} style={styles.cardImage} resizeMode="cover" />
      ) : (
        <Text style={styles.cardText}>?</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "20%",
    height: 100,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardFlipped: {
    transform: [{ rotateY: "180deg" }],
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    transform: [{ rotateY: "180deg" }],
  },
  cardText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
});
