const express = require("express");
const cors = require("cors");
const db = require("./db"); // Подключаем модуль для работы с PostgreSQL

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Notebook App Backend is running!");
});

// Route to test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).send("Database connection error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/// notes functional 

// Получение всех заметок
app.get("/notes", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM notes ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching notes:", err);
      res.status(500).send("Error fetching notes");
    }
  });
  
  // Создание новой заметки
  app.post("/notes", async (req, res) => {
    const { title, content } = req.body;
    try {
      const result = await db.query(
        "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
        [title, content]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error creating note:", err);
      res.status(500).send("Error creating note");
    }
  });
  
  // Обновление заметки
  app.put("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const result = await db.query(
        "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
        [title, content, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send("Note not found");
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error updating note:", err);
      res.status(500).send("Error updating note");
    }
  });
  
  // Удаление заметки
  app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).send("Note not found");
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error deleting note:", err);
      res.status(500).send("Error deleting note");
    }
  });
  