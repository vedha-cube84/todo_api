const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const ejs = require('ejs');
const serverless = require("serverless-http");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());




// app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.use("/.TODO_API/functions/app", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports.handler = serverless(app);