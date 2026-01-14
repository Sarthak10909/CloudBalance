import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { userFields } from './formConfig/userFields';
import FormRenderer from '../../components/form/FormRenderer';
import { createUser } from '../../api/userApi';

function AddUser() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    // const res = await axios.post(
    //     "http://localhost:8080/dashboard/users/addUser",
    //     formData,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //         withCredentials: true
    //     }
    // );

    const roleMap = {
      ADMIN: "ROLE_ADMIN",
      CUSTOMER: "ROLE_CUSTOMER",
      READ_ONLY: "ROLE_READ_ONLY",
    };

    const payload = {
      ...formData,
      role: roleMap[formData.role],
    };

    await createUser(payload);

    // const res = await createUser(formData);

    toast.success("User added successfully!", {
      position: "top-right",
      autoClose: 1500,
    });

    navigate("/dashboard/users");
    return;
  }

  return (
    <div className="bg-white p-8 mt-10 ml-4 rounded shadow-md w-fit">
      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={userFields}
          formData={formData}
          onChange={handleChange}
          className="grid grid-cols-2 gap-6"
        />

        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );

}

export default AddUser;