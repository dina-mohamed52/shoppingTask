// src/api.js
const API_URL = import.meta.env.VITE_APICO_URL;
const SHEET_ID = import.meta.env.VITE_APICO_SHEET_ID;
const API_KEY = import.meta.env.VITE_APICO_API_KEY;

export async function fetchTodos() {
  const res = await fetch(`${API_URL}/${SHEET_ID}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function addTodo(todo) {
  const res = await fetch(`${API_URL}/${SHEET_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/${SHEET_ID}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}
