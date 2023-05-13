import React from "react";

import { RootStackParamList } from "@custom-types/rootStackParamList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  NavigationHelpers,
  ParamListBase,
  StackActions,
  TabNavigationState,
} from "@react-navigation/native";
import StorageController from "@utils/handlers/StorageController";

import { Home } from "@screens/Home";
import { Partnership } from "@screens/Partnership";
import { Partnerships } from "@screens/Partnerships";

import { Container, Tab, TabIndicator } from "./styles";

import { Home as HomeIcon, Order, Profile, Text } from "@components";
import { MyProfile } from "@screens/MyProfile";

interface TabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const BottomTab = createBottomTabNavigator<RootStackParamList>();

export function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
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
        name="MyProfile"
        component={MyProfile}
        options={{ tabBarLabel: "Meu Perfil" }}
      />
    </BottomTab.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  function TabBarIcon({
    route,
    isActive,
  }: {
    route: string;
    isActive: boolean;
  }) {
    const color = isActive ? "#EF4444" : "#666666";
    return (
      <>
        {route === "Home" ? (
          <HomeIcon strokeColor={color} />
        ) : route === "Partnerships" ? (
          <Order strokeColor={color} />
        ) : (
          <Profile strokeColor={color} />
        )}
      </>
    );
  }

  return (
    <Container>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        async function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (route.name === "SignOut") {
            await StorageController.clearUserInfo();
            navigation.dispatch(StackActions.replace("SignIn"));
          }

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: route.params,
              key: route.key,
            });
          }
        }

        function onLongPress() {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        }

        return (
          <Tab
            key={index}
            testID={options.tabBarTestID}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <TabBarIcon route={route.name} isActive={isFocused} />
            <Text
              size={12}
              weight="500"
              color={isFocused ? "#EF4444" : "#666666"}
            >
              {options.tabBarLabel?.toString() ?? route.name}
            </Text>
            {isFocused && <TabIndicator />}
          </Tab>
        );
      })}
    </Container>
  );
}
