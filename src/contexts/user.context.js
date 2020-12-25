import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    const [partyCode, setPartyCode] = useState("");
    const [target, setTarget] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isAlive, setIsAlive] = useState(true);

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
                partyCode,
                setPartyCode,
                target,
                setTarget,
                isAdmin,
                setIsAdmin,
                isAuth,
                setIsAuth,
                isAlive,
                setIsAlive
            }}
        >
            {children}
        </UserContext.Provider>
    );
};