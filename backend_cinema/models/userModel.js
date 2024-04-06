import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Please fill a valid phone number']
    },
    firstName: {
        type: String,
        required: true,
        match: [/^[a-zA-Z]+$/, 'Please fill a valid name without numbers']
    },
    lastName: {
        type: String,
        required: true,
        match: [/^[a-zA-Z]+$/, 'Please fill a valid name without numbers']
    },
    role: {
        type: String,
        enum: ['ADMIN', 'EDITOR', 'USER'],
        required: true
    },
    resetPassword: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;