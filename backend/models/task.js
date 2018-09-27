import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Schema for a task that will hold multiple items that a user will tracks
const TaskSchema = new Schema({
    name: String,
    due: String,
}, {timestamps: true});


export default mongoose.model('Task', TaskSchema);