require("./db/mongoose");
const User = require("./models/users");

const express = require("express");
const userRouter=require('./routers/user')
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)


app.listen(port, () => {
  console.log("server is running at port " + port);
});
