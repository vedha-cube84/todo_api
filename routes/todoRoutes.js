const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const jwtAuth = require('../middleware/jwtAuth'); // Middleware for JWT auth

router.use(jwtAuth); // Protect all routes below

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
