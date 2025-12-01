import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({children}){
    const [auth, setAuth] = useState({
        user: null,
        isAdmin: false,
        authHeader: null
    })

    //login - loggar in, stämmer allt så sätts authheader till username + det base64 krypterade password.
    //Därefter sätts vår auth till vår användare helt enkelt och isAdmin används för rendering av olika sidor i applikationen
    const login = useCallback(async (username, password) => {
        const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
        return { success: false, error: "Invalid credentials" };
        }

        const data = await response.json();
        console.log(data)
        const base64 = btoa(`${username}:${password}`);
        const authHeader = `Basic ${base64}`;
        setAuth({
        user: data.username,
        isAdmin: data.isAdmin,
        authHeader
        });

        return { success: true };
    }, []);
    
    //logout - nollställer alla värden i vår auth state
    const logout = () => {
        setAuth({
        user: null,
        isAdmin: false,
        authHeader: null
        });
    };

    //Sätter Authorization i headern, slipper vi tänkta på detta vid anrop
    const authFetch = useCallback(
        async (url, options = {}) => {
        if (!auth.authHeader) {
            throw new Error("Not authenticated");
        }

        const finalOptions = {
            ...options,
            headers: {
            ...(options.headers || {}),
            Authorization: auth.authHeader
            }
        };

        return fetch(url, finalOptions);
        },
        [auth.authHeader]
    );

    //används som en wrapper och injicerar context till alla children som ligger under. i detta fall omsluts hela våran app i main.jsx av denna AuthProvider.
    return (
    <AuthContext.Provider value={{ auth, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

//En custom-Hook helt enkelt, returnerar "value={{ auth, login, logout, authFetch }}" från ovan. kan destructa och bryta ut delar istället
export function useAuth() {
  return useContext(AuthContext);
}