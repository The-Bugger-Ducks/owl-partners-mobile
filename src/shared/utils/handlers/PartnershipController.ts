import { api } from "@api";
import { Alert } from "react-native";
import { PARTNERSHIP_ENDPOINTS } from "../endpoints";
import { IPartnership, IPartnershipEdit } from "@interfaces/partner.interface";

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
      return data as IPartnership;
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

  async updatePartnership(payload: IPartnershipEdit, id: string) {
    try {
      await api.put(PARTNERSHIP_ENDPOINTS.EDIT + id, payload);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PartnershipController();
