import { api } from "@api";
import { IComment } from "@interfaces/annotation.interface";
import { ANNOTATION_ENDPOINTS } from "../endpoints";

class AnnotationController {
  async createAnnotation(partnerId: string, comment: string) {
    try {
      await api.post(ANNOTATION_ENDPOINTS.CREATE, {
        partnerId,
        comment,
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

  async updateAnnotation(id: string) {
    try {
      const { data } = await api.get(ANNOTATION_ENDPOINTS.EDIT + id);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AnnotationController();
