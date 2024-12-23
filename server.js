// const express = require('express');
// const bodyParser = require('body-parser');
// const todoRoutes = require('./routes/todos');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use('/api/todos', todoRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const { authenticateToken, authorizeRole } = require('./middleware/auth');
const app = express();

// Database Connection
// mongoose.connect('mongodb://localhost:27017/todo_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Database connection error:', err));
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo_db';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Protected Route Example
app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin panel!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
