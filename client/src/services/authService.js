import { apiFetch } from "./apiClient";

export async function login({ email, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register({ name, email, password, role }) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  });
}

export async function logoutAdmin() {
  return apiFetch("/auth/logout/admin", { method: "POST" });
}

export async function logoutMember() {
  return apiFetch("/auth/logout/teamMember", { method: "POST" });
}

