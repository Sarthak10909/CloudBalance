// import React, { useState, useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import axios from "axios";
// import { userFields } from './formConfig/userFields';
// import FormRenderer from '../../components/form/FormRenderer';
// import { getAllAccounts } from '../../api/accountApi';
// import { editUser, getUserWithAccounts } from '../../api/userApi';

// function EditUser() {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const userId = location.state?.userId;

//     if (!userId) {
//         return <div>User not found here!</div>;
//     }

//     const [formData, setFormData] = useState(null);
//     const [allAccounts, setAllAccounts] = useState([]);
//     const [userAccounts, setUserAccounts] = useState([]);

//     useEffect(() => {
//         getUserWithAccounts(userId).then(res => {
//             setFormData(res.data);
//             setUserAccounts(res.data.accountIds || []);
//         });

//         getAllAccounts().then(res => {
//             setAllAccounts(res.data);
//         })
//     }, [userId]);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleEdit = async (e) => {
//         e.preventDefault();

//         await editUser(userId, {
//             ...formData,
//             accountIds: selectedAccounts
//         });

//         navigate("/dashboard/users");
//     };

//     return (
//         <div className="bg-white p-8 mt-10 ml-4 rounded shadow-md w-fit">
//             <form onSubmit={handleEdit}>
//                 <div className="grid grid-cols-2 gap-6">
//                     {userFields.map(field => (
//                         <FormRenderer
//                             key={field.name}
//                             fields={[field]}
//                             formData={formData}
//                             onChange={handleChange}
//                         />
//                     ))}

//                     <div>
//                         <label className="block text-sm font-medium mb-2">
//                             Assigned Accounts
//                         </label>

//                         <div className="border rounded-md p-3 h-40 overflow-y-auto bg-gray-50">
//                             Accounts will appear here
//                         </div>
//                     </div>

//                 </div>


//                 <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">
//                     Edit
//                 </button>
//             </form>

//         </div>
//     );
// }

// export default EditUser;


import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { userFields } from './formConfig/userFields';
import FormRenderer from '../../components/form/FormRenderer';
import { getAllAccounts } from '../../api/accountApi';
import { editUser, getUserWithAccounts } from '../../api/userApi';

function EditUser() {
    const navigate = useNavigate();
    const location = useLocation();

    const userId = location.state?.userId;

    if (!userId) {
        return <div>User not found here!</div>;
    }

    const [formData, setFormData] = useState(null);
    const [allAccounts, setAllAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);

    useEffect(() => {
        getUserWithAccounts(userId).then(res => {
            setFormData(res.data);
            setSelectedAccounts(res.data.accountIds || []);
        });

        getAllAccounts().then(res => {
            setAllAccounts(res.data);
        });
    }, [userId]);

    // 🔑 IMPORTANT GUARD
    if (!formData) {
        return <div className="p-8">Loading user...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleAccount = (accountId) => {
        setSelectedAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        );
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        await editUser(userId, {
            ...formData,
            accountIds: selectedAccounts
        });

        navigate("/dashboard/users");
    };

    return (
        <div className="bg-white p-8 mt-10 ml-4 rounded shadow-md w-fit">
            <form onSubmit={handleEdit}>
                <div className="grid grid-cols-2 gap-6">

                    {userFields.map(field => (
                        <FormRenderer
                            key={field.name}
                            fields={[field]}
                            formData={formData}
                            onChange={handleChange}
                        />
                    ))}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Assigned Accounts
                        </label>

                        <div className="border rounded-md p-3 h-40 overflow-y-auto bg-gray-50">
                            {allAccounts.map(acc => (
                                <label key={acc.id} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedAccounts.includes(acc.id)}
                                        onChange={() => toggleAccount(acc.id)}
                                    />
                                    <span>{acc.accountName}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>

                <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Edit
                </button>
            </form>
        </div>
    );
}

export default EditUser;
