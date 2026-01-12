import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    
    const [user, setUser] = React.useState(null);

    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, collapsed, setCollapsed }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
