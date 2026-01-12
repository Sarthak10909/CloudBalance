import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getAllUsers = () => {
    return axiosInstance.get(`/dashboard/users`);
}

export const createUser = (data) => {
    return axiosInstance.post(`/dashboard/users/addUser`, data);
}

export const editUser = (id, data) => {
    return axiosInstance.put(`/dashboard/users/editUser/${id}`, data);
}

export const getUserWithAccounts = (id) => {
    return axiosInstance.get(`/dashboard/users/${id}/userAccount`);
}

// export const getUser = (id) => {
//     return axiosInstance.get(`/dashboard/users/getUser/{id}`);
// }

