const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, user: req.user.userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
