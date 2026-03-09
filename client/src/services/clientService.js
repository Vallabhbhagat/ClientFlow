import { apiFetch } from "./apiClient";

export function listClients() {
  return apiFetch("/client");
}

export function searchClientsByName(name) {
  return apiFetch(`/client/search?name=${encodeURIComponent(name)}`);
}

export function deleteClient(clientId) {
  return apiFetch(`/client/${clientId}`, { method: "DELETE" });
}

export function addClient({ name, email }) {
  return apiFetch("/client/add", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
}

