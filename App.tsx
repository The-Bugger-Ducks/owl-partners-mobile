import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

import { StatusBar } from "expo-status-bar";

import { AppRoutes } from "./src/routes";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400: Inter_400Regular,
    Inter_600: Inter_600SemiBold,
    Inter_700: Inter_700Bold,
    Inter_500: Inter_500Medium,
  });

  if (!isFontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <AppRoutes />
    </>
  );
}
