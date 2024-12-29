import React, { useState, useEffect } from "react";
import { fetchNotes, createNote, deleteNote, updateNote } from "./api";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to load notes:", error);
      }
    };

    loadNotes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const createdNote = await createNote(newNote); // Используем createNote
      setNotes((prevNotes) => [...prevNotes, createdNote]);
      setNewNote({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id); // Удаляем заметку через API
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Обновляем состояние
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditClick = (note) => {
    setEditNote(note); // Устанавливаем редактируемую заметку
  };
  const handleSaveEdit = async () => {
    try {
      const updatedNote = await updateNote(editNote.id, editNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      setEditNote(null); // Отключаем режим редактирования
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditNote((prevNote) => ({ ...prevNote, [name]: value }));
  };
  
  
  return (
    <div>
      <h1>Notebook</h1>
      
      {/* Форма для добавления новой заметки */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Список заметок */}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
{/* delete   */}
<ul>
  {notes.map((note) => (
    <li key={note.id}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => handleDeleteNote(note.id)}>Delete</button> {/* Кнопка удаления */}
    </li>
  ))}
<ul>
  {notes.map((note) => (
    <li key={note.id}>
      {editNote && editNote.id === note.id ? ( // Если редактируемая заметка
        <div>
          <input
            type="text"
            name="title"
            value={editNote.title}
            onChange={handleEditInputChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={editNote.content}
            onChange={handleEditInputChange}
            placeholder="Content"
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditNote(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <button onClick={() => handleEditClick(note)}>Edit</button>
          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </div>
      )}
    </li>
  ))}
</ul>

</ul>
      </ul>
    </div>
    
  );
};

export default App;
