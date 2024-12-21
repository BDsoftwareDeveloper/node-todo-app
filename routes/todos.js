const express = require('express');
const router = express.Router();

let todos = []; // In-memory storage for simplicity

// Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Create a new todo
router.post('/', (req, res) => {
    const { title, completed } = req.body;
    const newTodo = { id: todos.length + 1, title, completed: completed || false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.title = title || todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;

    res.json(todo);
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;
