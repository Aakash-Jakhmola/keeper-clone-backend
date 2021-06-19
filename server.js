require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const {Task} = require('./models/task')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
  if(err)
    console.log("DB not connected :(")
  else 
    console.log("DB connected :)")
})


app.get("/", (req, res) => {
  Task.find({}, (err, foundList) => {
    if(err) {
      console.log(err)
      res.send({error:err})
    }
    else {
      res.send(foundList)
    }
  })
})



app.post("/" , (req,res)=>{
  
  let newTask = new Task({
    title : req.body.title,
    body : req.body.body
  })

  newTask.save().then(()=>{
    res.send({msg : "Sucessfully added the task"})
  }, 
  (err)=>{
    console.log(err)
    res.send({error:err})
  })
})


app.patch("/:taskId",(req,res)=> {
  let newTask = { 
                  title : req.body.title, 
		  body : req.body.body
                }
  Task.findByIdAndUpdate(req.params.taskId, newTask ,  { safe: true, upsert: true } , (err)=> {
    if(err) {
      console.log(err)
      res.send({error : err})
    }
    else {
      res.send({msg : "Sucess"})
    }
  })
})

app.delete("/:taskId",(req,res)=>{
  Task.findByIdAndDelete(req.params.taskId,(err, task) => {
    if(err) 
      res.send({error: err}) 
    else {
      res.send({msg : "deletion successfull"})
    }
  })
})

let port = process.env.PORT || 8000
app.listen(port, ()=> {
  console.log(`Server running ${port}`)
}) 

//60cb8b241ed152160438e9da