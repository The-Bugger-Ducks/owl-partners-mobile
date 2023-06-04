import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Meeting: { id: string };
  Partnership: { id: string };
  Users: undefined;
  Partnerships: undefined;
  Home: undefined;
  HomeStack: undefined;
  MyProfile: { id: string };
};

type PropsStack = NativeStackNavigationProp<RootStackParamList>;

export { PropsStack, RootStackParamList };
