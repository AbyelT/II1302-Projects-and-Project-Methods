import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";

export const AuthenticatorContext = React.createContext();

//Stores the authentication status
export const AuthenticatorProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthenticatorContext.Provider value={{currentUser}}>
            {children}
        </AuthenticatorContext.Provider>
    )
};
