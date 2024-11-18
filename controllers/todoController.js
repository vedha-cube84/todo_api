const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, description  } = req.body;
  const userId = req.userId;

  try {
    const newTodo = new Todo({ userId, title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    // console.log('req', req);
  const { id } = req.params;
  
  const { title, description, completed } = req.body;

//   try {
//     const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
    try{
        // if (!req.user) {
        //     return res.status(401).json({ message: 'User not authenticated' });
        //   }
        // const  userId  = req.user._id;
        const todo = await Todo.findOne({ _id: id });
        console.log('todo', id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or does not belong to the user' });
          }
      
          // Update the todo fields
          todo.title = title || todo.title;
          todo.description = description || todo.description;
          todo.completed = completed !== undefined ? completed : todo.completed;
          await todo.save();
      
          res.status(200).json(todo); 
    } catch (err) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
//   const userId = req.user._id;

  try {
    await Todo.findByIdAndDelete({_id: id});
    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
