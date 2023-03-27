import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { RootStackParamList } from "../shared/types/rootStackParamList";

import { Home } from "@screens/Home";
import { SignIn } from "@screens/Auth/SignIn";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
