const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title : String,
  body : String
})

const Task = mongoose.model("task", taskSchema)

module.exports = {
  Task
}