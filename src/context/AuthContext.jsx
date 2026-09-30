import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const rememberedUser = localStorage.getItem("rememberedUser");
        const sessionUser = sessionStorage.getItem("currentUser");

        if (rememberedUser) {
            return JSON.parse(rememberedUser);
        }

        if (sessionUser) {
            return JSON.parse(sessionUser);
        }

        return null;
    });

    const login = (username, password, remember) => {
        if (!username.trim()) {
            return {
                success: false,
                message: "Username is required",
            };
        }

        if (!password) {
            return {
                success: false,
                message: "Password is required",
            };
        }

        if (username.trim().length < 3) {
            return {
                success: false,
                message: "Username must contain at least 3 characters",
            };
        }

        if (password.length < 8) {
            return {
                success: false,
                message: "Password must contain at least 8 characters",
            };
        }

        if (!/[A-Z]/.test(password)) {
            return {
                success: false,
                message: "Password must contain at least one uppercase letter",
            };
        }

        if (!/[a-z]/.test(password)) {
            return {
                success: false,
                message: "Password must contain at least one lowercase letter",
            };
        }

        if (!/[0-9]/.test(password)) {
            return {
                success: false,
                message: "Password must contain at least one number",
            };
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            return {
                success: false,
                message: "Password must contain at least one special character",
            };
        }

        const token =
            "jwt_" +
            btoa(username + ":" + Date.now()) +
            "_" +
            Math.random().toString(36).substring(2);

        const userData = {
            username: username.trim(),
            token: token,
        };

        if (remember) {
            localStorage.setItem(
                "rememberedUser",
                JSON.stringify(userData)
            );

            localStorage.setItem("jwtToken", token);

            sessionStorage.removeItem("currentUser");
            sessionStorage.removeItem("jwtToken");
        } else {
            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(userData)
            );

            sessionStorage.setItem("jwtToken", token);

            localStorage.removeItem("rememberedUser");
            localStorage.removeItem("jwtToken");
        }

        setUser(userData);

        return {
            success: true,
        };
    };

    const logout = () => {
        localStorage.removeItem("rememberedUser");
        localStorage.removeItem("jwtToken");

        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("jwtToken");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}