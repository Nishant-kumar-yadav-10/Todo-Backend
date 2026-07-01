const express=require('express')
const router=express.Router();
const {createTodo,deleteTodo, getTodos,updateTodo}=require("../controllers/todoController")
const {authMiddleware}=require("../middleware/auth.middleware")
router.post("/todo",authMiddleware,createTodo)
router.delete("/deletetodo/:id",authMiddleware,deleteTodo)
router.get("/getTodos",authMiddleware,getTodos)
router.patch("/updatetodo/:id", authMiddleware, updateTodo);
module.exports=router;