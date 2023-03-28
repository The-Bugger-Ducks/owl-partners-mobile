import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignIn: undefined;
  Partnership: { id: string; name: string };
  Partnerships: undefined;
  Home: undefined;
};

export type PropsStack = NativeStackNavigationProp<RootStackParamList>;
