import React, { useContext, useState } from 'react'
import Logo from "../../assets/Logo.png"
import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';


function Navbar() {

    const { collapsed, setCollapsed } = useContext(UserContext);

    const navigate = useNavigate();
    const LogoutEvent = () => {
        navigate('/');
    }

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow">

            <div className="flex items-center gap-6">
                <img className="w-40 h-20" src={Logo} alt="Logo" />

                <Menu onClick={() => setCollapsed(!collapsed)} className="cursor-pointer" size={28} />

                <div className="flex items-center gap-8">

                    <div className="flex flex-col w-40">
                        <label className="text-gray-700 mb-1 font-medium">Module</label>
                        <select
                            defaultValue="Lens"
                            className="border border-gray-300 p-2 rounded-lg bg-white"
                        >
                            <option value="Tuner">Tuner</option>
                            <option value="Auto">Auto</option>
                            <option value="Lens">Lens</option>
                        </select>
                    </div>

                </div>

            </div>

            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                    <div>
                        <User size={40} />
                    </div>
                    <div>
                        <h1>Welcome,<br/> 
                        <span style={{ fontWeight: "bold", fontSize: "22px" }}>Sarthak Singh</span></h1>
                    </div>
                </div>

                <button>
                    <LogOut onClick={LogoutEvent} size={26} className="cursor-pointer" />
                    <h5>Logout</h5>
                </button>
            </div>



        </div>

    )
}

export default Navbar
