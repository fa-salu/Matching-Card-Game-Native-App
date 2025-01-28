import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface LevelSelectorProps {
  click: number;
  setMaxMoves: (moves: number) => void;
  initializeGame: () => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  click,
  selectedLevel,
  setSelectedLevel,
  setMaxMoves,
  initializeGame,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const levels = [
    { level: "Easy", move: 60 },
    { level: "Medium", move: 46 },
    { level: "Hard", move: 36 },
  ];

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    const levelMoves = levels.find((lvl) => lvl.level === level)?.move || 60;
    setMaxMoves(levelMoves);
    initializeGame();
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.selectedText}>{selectedLevel}</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <FlatList
          data={levels}
          keyExtractor={(item) => item.level}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLevelChange(item.level)}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  selectedLevel === item.level && styles.selectedItemText,
                ]}
              >
                {item.level}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.dropdownList}
        />
      )}

      <Text style={styles.movesText}>
        Moves: {click} /{" "}
        {levels.find((lvl) => lvl.level === selectedLevel)?.move}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    position: "absolute",
    top: 50,
  },
  dropdownButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    color: "white",
    fontSize: 16,
  },
  dropdownList: {
    position: "absolute",
    top: 45,
    backgroundColor: "#444",
    borderRadius: 8,
    width: 120,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  dropdownItemText: {
    color: "white",
    fontSize: 16,
  },
  selectedItemText: {
    color: "#4CAF50",
  },
  movesText: {
    color: "white",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 900,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    padding: 10,
    borderRadius: 10,
  },
});
