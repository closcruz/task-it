import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import Task from '../models/task';

require('../passport')(passport);
const router = express.Router();

// Used to extract JWT token
function getToken (headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

// GET all tasks
router.get('/view', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers);
    if (token) {
        Task.find((err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

// POST a new task
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers);
    if (token) {
        const {name, due} = req.body;
        if (!name || !due) {
            return res.json({
                success: false,
                error: 'Need both entries to be filled to make a task'
            });
        }
        const newTask = new Task({
            name: name,
            due: due,
        });
        newTask.save(err => {
            if (err) return res.json({success: false, error: err});
            return res.json({success: false});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

export default router;