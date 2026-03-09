import { apiFetch } from "./apiClient";

export function listTasks() {
  return apiFetch("/task");
}

export function addTask(payload) {
  return apiFetch("/task/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTask(taskId, payload) {
  return apiFetch(`/task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteTask(taskId) {
  return apiFetch(`/task/${taskId}`, { method: "DELETE" });
}

export function listMyTasks() {
  return apiFetch("/membertask/my-task");
}

export function updateMyTaskStatus(taskId, status) {
  return apiFetch(`/membertask/my-task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

