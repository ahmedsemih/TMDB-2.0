const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const login = async (username: string, password: string, request_token: string) => {
  const res = await fetch(`${API_BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`,{
        method: "POST",
        headers: {
        "Content-Type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            username,
            password,
            request_token,
        }),
    }
  );
  const result = await res.json();
  return result;
};

export const logout = async (session_id: string) => {
  const res = await fetch(`${API_BASE_URL}/authentication/session?api_key=${API_KEY}`,{
        method: "DELETE",
        headers: {
        "Content-Type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify({ session_id }),
    }
  );
  const result = await res.json();
  return result;
};

export const getSessionId = async (request_token: string) => {
  const res = await fetch(`${API_BASE_URL}/authentication/session/new?api_key=${API_KEY}`,{
        method: "POST",
        headers: {
        "Content-Type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify({ request_token }),
    }
  );
  const sessionId = await res.json();
  return sessionId;
};

export const getRequestToken = async () => {
  const res = await fetch(`${API_BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  const token = await res.json();
  return token;
};
