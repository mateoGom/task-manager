const express=require('express')
const router=new express.Router()
const User=require('../models/users')

router.post("/users", async (req, res) => {
    const user = new User(req.body);
  
    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  
    // user
    //   .save()
    //   .then(() => {
    //     res.send(user);
    //   })
    //   .catch((e) => {
    //     res.send(e).status(400);
    //   });
  });
  
  router.get("/users", async (req, res) => {
    const user = await User.find({});
    try {
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  
    // User.find({})
    //   .then((users) => {
    //     res.send(users).status(200);
    //   })
    //   .catch((error) => {
    //     res.status(500);
    //   });
  });
  
  router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).send("not found");
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  
    // User.findById(_id)
    //   .then((user) => {
    //     if (!user) {
    //       return res.status(404);
    //     }
  
    //     res.send(user);
    //   })
    //   .catch(() => {
    //     res.status(500);
    //   });
  });
  
  router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidUpdate) {
      return res.send("invalid update").status(400);
    }
    try {
      
      const user=await User.findById(req.params.id)
      updates.forEach((update)=> user[update]=req.body[update])
      await user.save()
      // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      //   new: true,
      //   runValidators: true,
      // });
      if (!user) {
        return res.send("user does not found").status(404);
      }
      res.send(user);
    } catch (error) {
      res.send(error).status(400);
    }
  });
  
  router.delete("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404);
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  module.exports=router