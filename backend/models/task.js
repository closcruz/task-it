import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Schema for a task that will hold multiple items that a user will tracks
const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numTasks: Number,
    due: String,
    item_ids: [],
}, {timestamps: true});


export default mongoose.model('Task', TaskSchema);