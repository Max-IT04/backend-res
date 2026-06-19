const express = require("express");
const chalk = require("chalk");
const path = require('path');
const { addNote, getNotes, removeNote, updateNote } = require("./notes-controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.put('/:id', async (req, res) => {
  console.log('PUT request received:', {
    params: req.params,
    body: req.body,
    headers: req.headers
  });
  
  try {
    const { id } = req.params;
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const updatedNote = await updateNote(id, title.trim());
    
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(updatedNote);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Главная страница
app.get("/", async (req, res) => {
  res.render("index", {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

// Обработка формы (создание заметки)
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: 'Express App',
    notes: await getNotes(),
    created: true 
  });
});

app.delete('/:id', async (req, res) => {
  try {
    await removeNote(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port ${port}`));
});

