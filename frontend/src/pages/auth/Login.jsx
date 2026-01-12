import React, { useState, useContext } from 'react'
import Logo from "../../assets/Logo.png"
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormRenderer from "../../components/form/FormRenderer";

function Login() {

  const loginFields = [
    {
      label: "Email ID",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      required: true
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      required: true
    }
  ];

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [formData, setFormData] = useState({});
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          withCredentials: true
        }
      );
      setUser({ email: formData.email });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard/users");
    }
    catch (error) {
      console.error("Login failed:", error);
      console.error("Response:", error.response);
      console.error("Data:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white items-start p-10 rounded-lg shadow-lg">
        <img src={Logo} className="w-60 h-20 mb-5 mx-auto" />

        <form className="" onSubmit={handleSubmit}>
          <FormRenderer
            fields={loginFields}
            formData={formData}
            onChange={handleChange}
            className="flex flex-col gap-4"
          />

          <button className="w-full h-12 bg-blue-600 text-white rounded-lg mt-6">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;