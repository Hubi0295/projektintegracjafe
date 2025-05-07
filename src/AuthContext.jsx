import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:3000/auth/me", {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Nie zalogowany");
            const data = await res.json();
            setUsername(data.username);
        } catch {
            setUsername(null);
        } finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUsername(null);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUsername,logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
