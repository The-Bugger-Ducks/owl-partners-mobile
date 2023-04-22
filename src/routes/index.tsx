import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@custom-types/rootStackParamList";

import { SignIn } from "@screens/Auth/SignIn";

import { BottomTabs } from "@routes/BottomTabs";
import { Partnership } from "@screens/Partnership";

import { Meeting } from "@screens/Meeting";
import { CustomHeaderTitle } from "./CustomHeaderTitle";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="HomeStack" component={BottomTabs} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerTitle: "",
            headerBackTitle: "",
            headerShown: true,
            headerTransparent: true,
            headerBackVisible: false,
            headerLeft: () => <CustomHeaderTitle />,
          }}
        >
          <Stack.Screen name="Partnership" component={Partnership} />
          <Stack.Screen name="Meeting" component={Meeting} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
