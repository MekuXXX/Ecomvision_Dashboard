const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            min: 3,
            max: 100,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            max: 50,
            index: {
                unique: true,
                dropDups: true,
            },
        },
        password: {
            type: String,
            required: [true, 'Please provide an password'],
            min: 6,
        },
        city: {
            type: String,
            required: [true, 'Please provide user city'],
        },
        state: String,

        country: {
            type: String,
            required: [true, 'Please provide user country'],
        },
        occupation: {
            type: String,
            required: [true, 'Please provide user occupation'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please provide user phone number'],
        },
        transactions: {
            type: Array,
            required: [true, 'Please provid user transaction'],
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'admin',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
