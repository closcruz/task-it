import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

UsersSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(8, function (err, salt) {
            if (err) {return next(err);}
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {return next(err);}
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

UsersSchema.methods.comparePassword = function (passwrd, cb) {
    bcrypt.compare(passwrd, this.password, (err, isMatch) => {
        if (err) return cb(err);
        return cb(null, isMatch);
    });
};

export default mongoose.model('User', UsersSchema);

