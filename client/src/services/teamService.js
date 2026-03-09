import { apiFetch } from "./apiClient";

export function listTeam() {
  return apiFetch("/team");
}

export function addTeamMember(payload) {
  return apiFetch("/team/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteTeamMember(id) {
  return apiFetch(`/team/${id}`, { method: "DELETE" });
}

