import { IComment } from "src/shared/interfaces/annotation.interface";
import { api } from "src/shared/services/api";
import { ANNOTATION_ENDPOINTS } from "../endpoints";

class AnnotationController {
  async createAnnotation(annotation: IComment) {
    try {
      await api.post(ANNOTATION_ENDPOINTS.CREATE, annotation);
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
