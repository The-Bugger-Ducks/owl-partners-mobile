import axios, { InternalAxiosRequestConfig } from "axios";

import StorageController from "../utils/handlers/StorageController";

export const api = axios.create({
  baseURL: "http://172.18.160.1:3000",
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await StorageController.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
