import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

export const getDoctors = () => API.get("/doctors");
export const getDoctorById = (id) => API.get(`/doctors/${id}`);
export const updateDoctor = (id, payload) => API.put(`/doctors/${id}`, payload);
export const createDoctor = (payload) => API.post("/doctors", payload);
export const deleteDoctor = (id) => API.delete(`/doctors/${id}`);
