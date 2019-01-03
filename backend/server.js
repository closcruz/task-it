import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
// import session from 'express-session';
import auth from './routes/auth';
import task from './routes/task';

require('dotenv').config();

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

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


app.use('/auth', auth);
app.use('/tasks', task);
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Connected to port ${API_PORT}`));