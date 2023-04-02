import axios, { InternalAxiosRequestConfig } from "axios";

import StorageController from "../utils/handlers/StorageController";

export const api = axios.create({
  baseURL: "https://owlpartners.onrender.com/",
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await StorageController.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
