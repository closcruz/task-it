import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: String,
    username: String,
    password: String,
}, {timestamps: true});

export default mongoose.model('User', UsersSchema);

