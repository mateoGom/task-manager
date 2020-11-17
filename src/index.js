require("./db/mongoose");
const User = require("./models/users");

const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error)
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

app.get("/users", async (req, res) => {
 
  const user = await User.find({})
  try {
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
 
  // User.find({})
  //   .then((users) => {
  //     res.send(users).status(200);
  //   })
  //   .catch((error) => {
  //     res.status(500);
  //   });
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user=await User.findById(_id)
    if(!user){
      return res.status(404)
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
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

app.listen(port, () => {
  console.log("server is running at port " + port);
});
