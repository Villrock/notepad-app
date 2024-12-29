import React from "react";

const NoteList = ({
  notes,
  editNote,
  handleEditClick,
  handleSaveEdit,
  handleEditInputChange,
  handleDeleteNote,
  setEditNote,
}) => {
  return (
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
  );
};

export default NoteList;
