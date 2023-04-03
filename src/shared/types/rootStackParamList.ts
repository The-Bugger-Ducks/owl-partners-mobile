import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignIn: undefined;
  Partnership: { id: string };
  Partnerships: undefined;
  Home: undefined;
  HomeStack: undefined;
};

export type PropsStack = NativeStackNavigationProp<RootStackParamList>;
