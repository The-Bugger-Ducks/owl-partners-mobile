import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import { Home } from "./src/screens/Home";
import { CreatePartnership } from "./src/screens/CreatePartnership";
import { PartnershipInformation } from "@screens/PartnershipInformation";

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
      <PartnershipInformation />
    </>
  );
}
