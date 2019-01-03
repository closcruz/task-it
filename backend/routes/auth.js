import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user';

require('dotenv').config();

const router = express.Router();

// POST to register
router.post('/register', (req, res) => {
    const {email, username, password} = req.body;
    if (!email || !username || !password) {
        // Throw error if missing one of inputs
        return res.json({
            success: false,
            error: 'Need all inputs filled to make an account'
        });
    }
    const user = new User({
        email: email,
        username: username,
        password: password
    });
    user.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

// POST to login
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username: username}, (err, user) => {
        if (err) return err;
        if (!user) res.result(401).send({success:false, msg:'Log in failed, no user found'});
        user.comparePassword(password, (err, matches) => {
            if (matches && !err) {
                const body = {_id: user.id, user: user.username};
                const token = jwt.sign({user: body}, process.env.JWT_SECRET);
                return res.json({token: "JWT " + token});
            } else {
                res.status(401).send({success:false, msg: 'Log in failed, password incorrect'});
            }
        })
    })
});

export default router;
