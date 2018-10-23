import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt'
import jwt from 'jsonwebtoken';
import Item from './models/item';
import Task from './models/task';
import User from './models/user'

require('dotenv').config();

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// Setup for session use and authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// DB connection
mongoose.connect(process.env.dbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

// For testing login api
router.get('/fail', (req, res) => {
    res.json({message: 'Failed to login'})
});

// Setting up local strategy for passport
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new Strategy(opts, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.id}, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done (null, false);
    });
}));

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

// GET call to get tasks
router.get('/tasks', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers);
    if (token) {
        Task.find((err, tasks) => {
            if (err) return next(err);
            return res.json({success: true, data: tasks});
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

// POST call to add a task
router.post('/tasks', (req, res) => {
    const task = new Task();
    const {name, due} = req.body;
    if (!name || !due ) {
        // Throw error if we receive no data
        return res.json({
            success: false,
            error: 'You must provide a name for the task and a due date'
        });
    }
    task.name = name;
    task.due = due;
    task.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

// POST call for login authentication
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username: username}, (err, user) => {
        if (err) throw err;
        if (!user) res.status(401).send({success: false, msg: 'Log in failed, User not found.'});
        user.comparePassword(password, (err, matches) => {
            if (matches && !err) {
                // If user found and password is correct, create token
                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
                // Return user info and token as JSON
                res.json({success: true, token: 'JWT' + token});
            }
            else {
                res.status(401).send({success: false, msg: 'Log in failed. Wrong password'});
            }
        });
    });
});

// POST to register a new user
router.post('/user', (req, res) => {
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

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Connected to port ${API_PORT}`));