import { apiFetch } from "./apiClient";

export function listProjects() {
  return apiFetch("/project");
}

export function addProject(payload) {
  return apiFetch("/project/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProject(projectId, payload) {
  return apiFetch(`/project/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProject(projectId) {
  return apiFetch(`/project/${projectId}`, { method: "DELETE" });
}

