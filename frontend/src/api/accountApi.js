import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getAllAccounts = () => {
    return axiosInstance.get(`/accounts/fetchAccount`);
}

export const createAccount = () => {
    return axiosInstance.post('/accounts/createAccount');
}