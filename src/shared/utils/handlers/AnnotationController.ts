import { api } from "@api";
import { IComment } from "@interfaces/annotation.interface";
import { ANNOTATION_ENDPOINTS } from "../endpoints";

import StorageController from "./StorageController";

class AnnotationController {
  async createAnnotation(partnerId: string, comment: string) {
    try {
      const user = await StorageController.getUserInfo();

      if (!user || user?.id == null) {
        throw new Error("User is empty");
      }

      await api.post(ANNOTATION_ENDPOINTS.CREATE, {
        partnerId,
        comment,
        userId: user.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAnnotations(id: string) {
    try {
      const { data } = await api.get(ANNOTATION_ENDPOINTS.LIST + id);
      return data as IComment[];
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }
}

export default new AnnotationController();
