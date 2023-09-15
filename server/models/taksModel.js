const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:Date,
    completed:Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
})

module.exports = mongoose.model('Task', taskSchema)