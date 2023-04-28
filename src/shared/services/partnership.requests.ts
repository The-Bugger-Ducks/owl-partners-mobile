import { api } from "@api";

import { IPartnership, IPartnershipEdit } from "@interfaces/partner.interface";
import { alertError } from "@utils/alertError";
import { Alert } from "react-native";
import { PARTNERSHIP_ENDPOINTS } from "../constants/endpoints";
import {
  formatPartnerStatusByList,
  formatStatus,
} from "@utils/handlers/formatEnumsPartner";

class PartnershipRequests {
  async createPartnership(newPartnership: IPartnership) {
    try {
      const { data } = await api.post(
        PARTNERSHIP_ENDPOINTS.CREATE,
        newPartnership,
      );
      return data;
    } catch (error) {
      alertError(error, "Não foi possível cadastrar a parceria :(");
    }
  }

  async getPartnerships(disabled?: boolean, name?: string) {
    try {
      const { data } = name
        ? await api.get<IPartnership[]>(
          PARTNERSHIP_ENDPOINTS.LIST +
              `?disabled=${disabled}` +
              `&name=${name}`,
        )
        : await api.get<IPartnership[]>(
          PARTNERSHIP_ENDPOINTS.LIST + `?disabled=${disabled}`,
        );

      return formatPartnerStatusByList(data);
    } catch (error) {
      alertError(error, "Não foi possível carregar a lista de parcerias :(");
    }
  }

  async getPartnership(id: string) {
    try {
      const { data } = await api.get<IPartnership>(
        PARTNERSHIP_ENDPOINTS.DETAILS + id,
      );
      return formatStatus(data);
    } catch (error) {
      alertError(error, "Não foi possível carregar os dados da parceria :(");
    }
  }

  async updatePartnership(updatedPartnership: IPartnershipEdit, id: string) {
    try {
      await api.put(PARTNERSHIP_ENDPOINTS.EDIT + id, updatedPartnership);
    } catch (error) {
      alertError(error, "Não foi possível atualizar os dados da parceria :(");
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
      alertError(error, "Não foi possível deletar a parceria :(");
    }
  }
}

export default new PartnershipRequests();
