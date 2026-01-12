
import React from 'react'
import { useNavigate } from 'react-router-dom'
import UsersTable from '../pages/users/Table';
import Footer from './layout/Footer';

function Users() {
  const navigate = useNavigate();

  const handleAddNewUser = () => {
    navigate("/dashboard/users/addUser");
  }

  return (
    <div>
      <div className = "py-5">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition " onClick = {handleAddNewUser}>Add New User</button>
      </div>
      <hr/>

      <UsersTable/>
      
      
      
    </div>
    
  )
}

export default Users
