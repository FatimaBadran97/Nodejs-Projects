const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  name:{
    type:String,
    required: [true, "Must provide name"],
    trim: true,
    maxLength: [20, 'Name cant be more than 20 charactors']
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', TaskSchema)
