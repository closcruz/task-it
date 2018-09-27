import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Item schema that represents items in a task
const ItemSchema = new Schema({
    name: String,
    due: String,
}, {timsestamps: true});


export default mongoose.model('Item', ItemSchema);