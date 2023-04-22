import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SignIn: undefined;
  Meeting: { id: string };
  Partnership: { id: string };
  Partnerships: undefined;
  Home: undefined;
  HomeStack: undefined;
  MyProfile: undefined;
};

type PropsStack = NativeStackNavigationProp<RootStackParamList>;

export { PropsStack, RootStackParamList };
