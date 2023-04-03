import { api } from "@api";
import { Alert } from "react-native";
import { PARTNERSHIP_ENDPOINTS } from "../endpoints";

class PartnershipController {
  async getPartnerships() {
    try {
      const { data } = await api.get(PARTNERSHIP_ENDPOINTS.LIST);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPartnership(id: string) {
    try {
      const { data } = await api.get(PARTNERSHIP_ENDPOINTS.DETAILS + id);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async deletePartnership(id: string) {
    try {
      await api.delete(PARTNERSHIP_ENDPOINTS.DELETE + id);
      Alert.alert(
        "Parceria excluída!",
        "Esta parceria ainda vai aparecer na listagem, mas ações como editar ou adicionar anotação foram bloqueadas!",
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PartnershipController();
