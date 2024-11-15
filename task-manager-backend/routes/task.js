const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const socketIO = require('../server')
const router = express.Router();

//always emit task before any api


router.post('/tasks', auth, async (req, res) => {
    try {
        let task;
        if(req.body.assignedTo){
            task = new Task({ ...req.body, user: req.user.userId, status:"IN PROGRESS" });
            await task.save();
        }
        else{
            task = new Task({ ...req.body, user: req.user.userId, status:"NOT ASSIGNED" });
            await task.save();
        }
        socketIO.socketIO.emit('taskAdded', task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        socketIO.socketIO.emit('taskList', tasks);
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        socketIO.socketIO.emit('taskUpdated', task);
        res.json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        socketIO.socketIO.emit('taskDeleted', task);
        res.json({ msg: 'Task deleted' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
