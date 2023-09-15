const taskModel = require("../models/taksModel");
const userModel = require("../models/usersModal");

//create a new task
exports.createTaskController = async (req, res) => {
  try {
    const { title, description, dueDate, completed, user } = req.body;

    if (!title || !description || !dueDate || !user) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all required fields" });
    }
    if (completed === undefined || completed === null) {
      return res.status(400).send({
        success: true,
        message: "Please provide a valid 'completed' value",
      });
    }
    const newTask = await taskModel.create({
      title: title,
      description: description,
      dueDate: dueDate,
      completed: completed,
      user: user,
    });

    // await userModel.findByIdAndUpdate(userId, {
    //   $push: { tasks: newTask._id },
    // });

    return res.status(200).send({
      status: "success",
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error creating task",
      error: error,
    });
  }
};

//get all tasks
exports.getAllTasksController = async (req, res) => {
  try {
    const allTasks = await taskModel.find();
    return res.status(200).send({
      success: true,
      message: "All tasks",
      allTasks: allTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting tasks",
      error: error,
    });
  }
};

//get task by id
exports.getTaskByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ success: false, message: "please enter a task id" });
    }
    const task = await taskModel.findById(id);
    if (task) {
      return res.status(200).send({
        success: true,
        message: "task found successfully",
        task: task,
      });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "task does not exist with id " + id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Task with id " + req.params.id + " is not found",
      error: error,
    });
  }
};

//update task
exports.updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, description, dueDate, completed } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { task, description, dueDate, completed },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Task updated successfully",
      updatedTask: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cannot update task with id",
      error,
    });
  }
};

//delete task
exports.deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.findByIdAndDelete(id);
    return res.status(500).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cannot delete task",
      error,
    });
  }
};

exports.getUserTasksController = async (req, res) => {
  try {
    const id = req.user.userId
      const tasks = await taskModel.find({user:id})
      if(!tasks){
       return res.status(404).send({success:false, message: "task not found"})
      }
      return res.status(200).send({success:true, message:"task found successfully",tasks:tasks})
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "cannot get user tasks", error });
  }
};
