
import axios from "axios";

const API_URL = "http://localhost:5000"; // URL вашего бэкенда

// Получить все заметки
export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/notes/${id}`);
};

export const updateNote = async (id, updatedNote) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, updatedNote);
  return response.data;
};
