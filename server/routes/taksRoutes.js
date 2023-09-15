const express = require("express");
const taskModel = require("../models/taksModel");
const { createTaskController, getAllTasksController, getTaskByIdController, updateTaskController, deleteTaskController, getUserTasksController } = require("../controllers/taskControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/post-task", createTaskController);
router.get("/getAllTasks",getAllTasksController)
router.get('/getTask/:id',getTaskByIdController)
router.put("/updateTask/:id",updateTaskController)
router.delete("/deleteTask/:id",deleteTaskController)
router.get("/getUserTask",authMiddleware.authenticateUser,getUserTasksController)

module.exports = router;