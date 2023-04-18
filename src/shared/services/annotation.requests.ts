import { api } from "@api";

import { IComment } from "@interfaces/annotation.interface";
import { alertError } from "@utils/alertError";
import { ANNOTATION_ENDPOINTS } from "../constants/endpoints";
import StorageController from "@utils/handlers/StorageController";

class AnnotationRequests {
  async createAnnotation(partnerId: string, comment: string) {
    try {
      const user = await StorageController.getUserInfo();

      if (!user || user?.id == null) {
        throw new Error("User is empty");
      }

      return await api.post(ANNOTATION_ENDPOINTS.CREATE, {
        partnerId,
        comment,
        userId: user.id,
      });
    } catch (error) {
      alertError(error, "Não foi possível cadastrar a anotação :(");
    }
  }

  async getAnnotations(id: string) {
    try {
      const { data } = await api.get(ANNOTATION_ENDPOINTS.LIST + id);
      return data as IComment[];
    } catch (error) {
      alertError(error, "Não foi possível carregar a lista de anotações :(");
    }
  }

  async updateAnnotation(
    commentId: string,
    partnerId: string,
    comment: string,
  ) {
    try {
      const { data } = await api.put(ANNOTATION_ENDPOINTS.EDIT + commentId, {
        partnerId,
        comment,
      });
      return data;
    } catch (error) {
      alertError(error, "Não foi possível atualizar o comentário :(");
    }
  }
}

export default new AnnotationRequests();
