const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String,
        enum: ["NOT ASSIGNED", "IN PROGRESS", "COMPLETED"],
        default: "NOT ASSIGNED"
    },
    
});

module.exports = mongoose.model('Task', TaskSchema);
