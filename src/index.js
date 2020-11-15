require("./db/mongoose");
const User = require("./models/users");

const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e).status(400);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users).status(200);
    })
    .catch((error) => {
      res.status(500);
    });
});

app.get('/users/:id',(req,res)=>{
    const _id=req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404)
        }

        res.send(user)

    }).catch(()=>{
        res.status(500)
    })
})

app.listen(port, () => {
  console.log("server is running at port " + port);
});
