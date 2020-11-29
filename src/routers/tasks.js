const express = require("express");
const router = new express.Router();
const Task = require("../models/tasks");

router.get("/tasks", async (req, res) => {
  const task = await Task.find({});
  try {
    res.send(task).status(200);
  } catch (error) {
    res.status(404);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("task not found");
    }

    res.send(task).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task).status(201);
  } catch (error) {
    res.send(error).status(400);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "completed"];
  const validUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!validUpdate) {
    res.send("invalid update").status(400);
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      return res.send("task not found").status(404);
    }

    res.send(task).status(201);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete("/tasks/:id", async (req,res)=>{

try {
  const task=await Task.findByIdAndDelete(req.params.id)
  if(!task){
   return  res.send("Task not found").status(404)
  }
  res.send(task).status(201)
} catch (error) {
  res.send(error).status(500)
}

})

module.exports=router;
