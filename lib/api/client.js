const API_BASE_URL = "http://localhost:8080/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const isAuthRequest =
    endpoint === "/auth/login" ||
    endpoint === "/auth/register";

  const token =
    typeof window !== "undefined" && !isAuthRequest
      ? localStorage.getItem("token")
      : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}