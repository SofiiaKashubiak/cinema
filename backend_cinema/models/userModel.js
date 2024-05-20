const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please fill a valid email address'],
        unique: true
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
        required: true,
        default: 'USER'
    },
    resetPassword: {
        type: String,
        select: false
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre("save", async function(next){
    if (!this.reservePassword) return next();

    this.reservePassword = await bcrypt.hash(this.reservePassword, 12);
    next();
})



const User = mongoose.model('User', userSchema);
module.exports = User;