import axios, { InternalAxiosRequestConfig } from "axios";

import StorageController from "../utils/handlers/StorageController";

export const api = axios.create({
  baseURL: "http://192.168.0.8:3000",
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	const token = await StorageController.getToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
