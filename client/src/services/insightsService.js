import { apiFetch } from "./apiClient";

export function getAllProjectInsights() {
  return apiFetch("/project-insights/all");
}

export function getProjectInsights(projectId) {
  return apiFetch(`/project-insights/project/${projectId}`);
}

