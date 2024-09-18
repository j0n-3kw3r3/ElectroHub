import { api } from "./api";


export const fetchProductsEP = () => api.get("/products").then((res) => res?.data);
export const createProductsEP = (data) => api.post("/products", data).then((res) => res?.data);
export const updateProductsEP = (data, id) => api.put(`/products/${id}`, data).then((res) => res?.data);
export const updateUserEP = (data, id) => api.put(`/auth/${id}`, data).then((res) => res?.data);

export const fetchMatricsEP = () => api.get("/matrics").then((res) => res?.data);
export const fetchOrdersEP = () => api.get("/orders").then((res) => res?.data);
export const fetchUsersEP = () => api.get("/auth").then((res) => res?.data);
export const fetchCategoriesEP = () => api.get("/category").then((res) => res?.data);
export const fetchSubCategoriesEP = () => api.get("/subCategory").then((res) => res?.data);


export const quotesEP = () =>
    api.get('/order/quote/').then(res => res.data);

export const fetchPackagesEP = () => api.get(`/packages`).then(res => res?.data);

export const acceptQouteEP = (id) => api.patch(`/order/accept/quote/${id}`);
