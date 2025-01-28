import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "./Card";

interface GameGridProps {
  cards: string[];
  flipped: number[];
  solved: number[];
  images: { [key: string]: any };
  onCardPress: (index: number) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  cards,
  flipped,
  solved,
  images,
  onCardPress,
}) => (
  <View style={styles.grid}>
    {cards.map((card, index) => (
      <Card
        key={index}
        index={index}
        isFlipped={flipped.includes(index)}
        isSolved={solved.includes(index)}
        image={images[card]}
        onPress={() => onCardPress(index)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",

    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 150,
  },
});
