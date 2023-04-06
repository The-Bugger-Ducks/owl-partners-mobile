import { isAxiosError } from "axios";
import { Alert } from "react-native";

export function alertError(error: any, mensage?: string) {
  if (isAxiosError(error)) {
    if (error.response && error.response.status === 401) {
      Alert.alert(
        "Sessão expirada!",
        "Faça login novamente para continuar navegando pelo app",
      );
      console.error(error);
      throw new Error("Unauthorized");
    }
    if (error.response && error.response.status >= 500) {
      Alert.alert(
        "Instabilidade no servidor!",
        "Tente novamente dentro de alguns instantes...",
      );
      console.error(error);
    }

    console.error(error);
    Alert.alert("Ops!", mensage);
  }
}
