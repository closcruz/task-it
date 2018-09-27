import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import {getSecret} from './secret';
import Item from './models/item';
import Task from './models/task';


const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// DB connection
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

// GET call to get tasks
router.get('/tasks', (req, res) => {
    Task.find((err, tasks) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: tasks});
    });
});

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

app.use('/', router);

app.listen(API_PORT, () => console.log(`Connected to port ${API_PORT}`));