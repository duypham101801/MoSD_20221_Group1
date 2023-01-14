const mongoose = require('mongoose');
const config = require('config');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        required: true,
    },
    countContacts: Number,
    refreshToken: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.statics.allAccount = function() {
    return this.aggregate([
        {
            $match: {
                role: { $ne: config.get('role.admin') },
            },
        },
        {
            $project: {
                email: 1,
                name: 1,
                phone: 1,
                role: 1,
            },
        },
    ]);
};

userSchema.statics.accountDetail = function(userId) {
    return this.find(
        { _id: userId },
        {
            email: 1,
            name: 1,
            phone: 1,
            role: 1,
            countContacts: 1,
            createdAt: 1,
        },
    );
};

const User = mongoose.model('User', userSchema);
module.exports = User;