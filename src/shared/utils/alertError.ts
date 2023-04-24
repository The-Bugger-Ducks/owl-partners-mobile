import { isAxiosError } from "axios";
import { Alert } from "react-native";

export function alertError(error: any, mensage?: string) {
  if (isAxiosError(error)) {
    if (error.response && error.response.status === 401) {
      console.error(error);
      Alert.alert(
        "Sessão expirada!",
        "Faça login novamente para continuar navegando pelo app",
      );
      throw new Error("Unauthorized");
    } else if (error.response && error.response.status >= 500) {
      console.error(error);
      Alert.alert(
        "Instabilidade no servidor!",
        "Tente novamente dentro de alguns instantes...",
      );
    } else {
      console.error(error);
      Alert.alert("Ops!", mensage);
    }
  }
}
