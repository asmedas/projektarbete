import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);
export default function AuthProvider({children}){

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}