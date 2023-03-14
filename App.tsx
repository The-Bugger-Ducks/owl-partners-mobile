import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Home } from "./src/screens/Home";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400: Inter_400Regular,
    Inter_600: Inter_600SemiBold,
    Inter_700: Inter_700Bold,
  });

  if (!isFontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Home />
    </>
  );
}
