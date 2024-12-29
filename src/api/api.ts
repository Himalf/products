export const BASE_URL = "http://localhost:4000";
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
export const fetchWithAuth = async (
  endPoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers as Record<string, string>),
    Authorization: token ? `${token}` : "",
    "content-type": "application/json",
  };
  const response = await fetch(`${BASE_URL}/${endPoint}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
