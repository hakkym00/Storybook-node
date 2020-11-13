const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    firstName: { type: String, required: true },
    image: { type: String },
    lastName: { type: String, required: true },
},  { timestamps: true })
//e
const User = mongoose.model('User', userSchema )

module.exports = User