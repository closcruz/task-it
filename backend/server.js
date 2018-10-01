import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
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

// Serialization and deserialization of User
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    db.collection('users').findOne(
        {_id: mongoose.Types.ObjectId(id)},
        (err, doc) => {
            done(null, doc);
        }
    );
});

// Setting up local strategy for passport
passport.use(new LocalStrategy(
    function (username, password, done) {
        db.collection('users').findOne({username: username}, (err, user) => {
            console.log("User: " + username + " attempted to log in.");
            if (err) return done(err);
            if (!user) return done(null, false);
            if (password !== user.password) return done(null, false);
            return done(null, user);
        });
    }
));

// GET call to get tasks
router.get('/tasks', (req, res) => {
    Task.find((err, tasks) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: tasks});
    });
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
router.post('/login', passport.authenticate('local', {failureRedirect: '/api/fail'}), (req, res) => {
    res.redirect('/api');
});

// POST to register a new user
router.post('/user', (req, res) => {
    const user = new User();
    const {email, username, password} = req.body;
    if (!email || !username || !password) {
        // Throw error if missing one of inputs
        return res.json({
            success: false,
            error: 'Need all inputs filled to make an account'
        });
    }
    user.email = email;
    user.username = username;
    user.password = password;
    user.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Connected to port ${API_PORT}`));