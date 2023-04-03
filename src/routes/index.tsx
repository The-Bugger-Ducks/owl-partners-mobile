import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../shared/types/rootStackParamList";

import { SignIn } from "@screens/Auth/SignIn";

import { BottomTabs } from "@routes/BottomTabs";

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
        <Stack.Screen name="HomeStack" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
