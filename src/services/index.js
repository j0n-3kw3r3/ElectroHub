import { api, formDataApi } from "./api";


export const fetchProductsEP = () => api.get("/products").then((res) => res?.data);
export const createProductsEP = (data) => formDataApi.post("/products", data).then((res) => res?.data);
export const registerEP = (data) => api.post("/auth/register", data).then((res) => res?.data);
export const loginEP = (data) => api.post("/auth/login", data).then((res) => res?.data);
export const forgotPasswordEP = (data) => api.post("/auth/forgot-password", data).then((res) => res?.data);
export const createOrderEP = (data) => api.post("/orders", data).then((res) => res?.data);
export const createNotificationEP = (data) => api.post("/notifications", data).then((res) => res?.data);
export const resetPasswordEP = (data, resetToken) => api.post(`/auth/reset-password/${resetToken}`, data).then((res) => res?.data);
export const addCartEP = (data, userId) => api.post(`/auth/carts/${userId}/products`, data).then((res) => res?.data);
export const updateProductsEP = (data, id) => formDataApi.put(`/products/${id}`, data).then((res) => res?.data);
export const fetchNotificationsEP = (id) => api.get(`/notifications/${id}`).then((res) => res?.data);
export const fetchOrderEP = (id) => api.get(`/orders/${id}`).then((res) => res?.data);
export const toggleRoleEP = (data, id) => api.put(`/auth/${id}/toggle-role`).then((res) => res?.data);
export const updateUserEP = (data, id) => formDataApi.put(`/auth/${id}`, data).then((res) => res?.data);

export const fetchMatricsEP = () => api.get("/matrics").then((res) => res?.data);
export const fetchOrdersEP = () => api.get("/orders").then((res) => res?.data);
export const fetchUsersEP = () => api.get("/auth").then((res) => res?.data);
export const fetchCategoriesEP = () => api.get("/category").then((res) => res?.data);
export const fetchSubCategoriesEP = () => api.get("/subCategory").then((res) => res?.data);
