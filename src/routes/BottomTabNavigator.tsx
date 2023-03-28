import React from "react";

import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import { View, Text, TouchableOpacity } from "react-native";

import { RootStackParamList } from "../shared/types/rootStackParamList";

const BottomTab = createBottomTabNavigator<RootStackParamList>();

import { Home } from "@screens/Home";
import { SignIn } from "@screens/Auth/SignIn";
import { StatusBar } from "expo-status-bar";
import { Partnership } from "@screens/Partnership";
import { Partnerships } from "@screens/Partnerships";

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomTabsRoutes {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Partnership" component={Partnerships} />
      <BottomTab.Screen name="Home" component={Home} />
    </BottomTab.Navigator>
  );
}

export function BottomTabsRoutes() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: "#C9BCCD",
        tabBarActiveTintColor: "#FF2574",
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Home" }}
      />
      <BottomTab.Screen
        name="Partnerships"
        component={Partnerships}
        options={{ tabBarLabel: "Parcerias" }}
      />
      <BottomTab.Screen
        name="Partnership"
        component={Partnership}
        options={{ tabBarLabel: "Meu Perfil" }}
      />
    </BottomTab.Navigator>
  );
}
