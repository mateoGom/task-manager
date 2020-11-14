require('./db/mongoose')
const User=require('./models/users')

const express=require('express')

const app=express()

const port=process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user=new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e).status(400)
    })



})

app.listen(port,()=>{
    console.log('server is running at port '+port)
})