const Todo=require("../model/TodoModel")


async function createTodo(req,res){
    try {
        const {title}=req.body
        const todo=await Todo.create({
            title,
            user:req.user._id
        })
        return res.status(201).json({
            message:"Todo Created Successfully",
            todo
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error in creating Todo",
            error:error.message
        })
    }
}


async function deleteTodo(req,res){
try {
    const todoID=req.params.id;
    const todo=await Todo.findById(todoID);
    if(!todo){
        return res.status(404).json({
            Message:"Todo does not exist"
        })

    }
    await Todo.findByIdAndDelete(todoID);
    return res.status(200).json({
        message:"Todo deleted successfully"
    })
} catch (error) {
     return res.status(500).json({
            message: "Error deleting todo",
            error: error.message
        });
}
}

async function getTodos(req,res){
    try {
        const todos=await Todo.find({
            user:req.user._id
        })
        return res.status(200).json({
            message:"Todo fetched successfully",
            todos
        })
    } catch (error) {
         return res.status(500).json({
            message: "Error fetching todos",
            error: error.message
        });
    }
}

async function updateTodo(req,res){
    try{
        const todo=await Todo.findOne({
            _id:req.params.id,
            user:req.user._id
        })

 if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        todo.completed=!todo.completed
        await todo.save()
           return res.status(200).json({
            message: "Todo updated successfully",
            todo
        });

    }catch{
 return res.status(500).json({
            message: error.message
        });
    }
}
module.exports={
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo
}