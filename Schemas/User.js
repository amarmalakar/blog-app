const mongoose = require('mongoose');

const UserSignupSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: [true, 'Please Add Your First Name']
        },
        lname: String,
        email: {
            type: String,
            required: [true, 'Please add the email'],
            unique: true
        },
        username: {
            type: String,
            required: [true, 'Please add the username'],
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user',
            required: true,
            enum: ['root', 'admin', 'user']
        },
        image: String,
        facebook: String,
        instagram: String,
        twitter: String,
        github: String,
    }, {
        timestamps: true
    }
)

export default mongoose.models.User || mongoose.model('User', UserSignupSchema);