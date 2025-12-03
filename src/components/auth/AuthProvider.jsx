import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({children}){
    const [auth, setAuth] = useState({
        id: null,
        user: null,
        isAdmin: false,
        authHeader: null,
        loading: true
    })

    useEffect(() => {
        const storedId = localStorage.getItem("id")
        const storedUser = localStorage.getItem("user")
        const storedIsAdmin = localStorage.getItem("isAdmin")
        const storedAuthHeader = localStorage.getItem("authHeader")

        if (storedUser && storedAuthHeader) {
            setAuth({
                id: storedId,
                user: storedUser,
                isAdmin: storedIsAdmin === "true",
                authHeader: storedAuthHeader,
                loading: false
            });
        } else {
            setAuth(prev => ({ ...prev, loading: false }));
        }
    }, []);

    //login - loggar in, stämmer allt så sätts authheader till username + det base64 krypterade password.
    //Därefter sätts vår auth till vår användare helt enkelt och isAdmin används för rendering av olika sidor i applikationen
    const login = useCallback(async (username, password) => {
        try{
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

            const newAuth = {
                id: data.id,
                user: data.username,
                isAdmin: data.isAdmin,
                authHeader,
            };

            setAuth(newAuth);

            localStorage.setItem("id", newAuth.id)
            localStorage.setItem("user", newAuth.user)
            localStorage.setItem("isAdmin", newAuth.isAdmin)
            localStorage.setItem("authHeader", newAuth.authHeader)
            return { success: true };
        } catch (error) {
            return { success: false, error: "Network error" };
    }
    }, []);
    
    //logout - nollställer alla värden i vår auth state
    const logout = () => {
        setAuth({
            id: null,
            user: null,
            isAdmin: false,
            authHeader: null
        });
        localStorage.removeItem("id")
        localStorage.removeItem("user")
        localStorage.removeItem("isAdmin")
        localStorage.removeItem("authHeader")
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