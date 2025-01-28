import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../components/Home";
import Game from "../components/Game";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
