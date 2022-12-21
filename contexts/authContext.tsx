import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

import { getRequestToken, getSessionId, login } from "../services/auth-service";
import { getDetails } from "../services/user-service";

const authContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const router = useRouter();
    const [user, setUser]: any = useState(null);
    const [password, setPass]: any = useState(null);

    // Check if user logged in
    useEffect(() => {
        const checkLoggedIn = async () => {
            const sessionId = secureLocalStorage.getItem("session_id")?.toString();
            if (!sessionId) return;

            const details = await getDetails(sessionId);
            setUser(details);

            const pass = secureLocalStorage.getItem("req");
            setPass(pass);
        };
        checkLoggedIn();
    }, [secureLocalStorage.getItem("session_id")]);

    // Check expires date and create new session
    useEffect(() => {
        if (!user) return;

        const expires_at = secureLocalStorage.getItem("expires_at");
        const now = Date.now();
        const expiresDate = Date.parse(String(expires_at));

        if ((expiresDate - now) > 600000) return;

        if ((expiresDate - now) < 0) {
            setUser(null);
            return secureLocalStorage.clear();
        }

        const fetchNew = async () => {
            const { request_token } = await getRequestToken();
            const { session_id } = await getSessionId(request_token);
            const res = await login(user.username, password, request_token);

            secureLocalStorage.setItem("request_token", res.request_token);
            secureLocalStorage.setItem("expires_at", res.expires_at);
            secureLocalStorage.setItem("session_id", session_id);
        };
        fetchNew();
    }, [router.pathname]);

    const values = {
        user,
        setUser,
        setPass
    }

    return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export const useAuthContext = () => useContext(authContext);