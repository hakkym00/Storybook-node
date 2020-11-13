const mongoose = require('mongoose')

const storySchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    body: { type: String, required: true },
    status: { type: String, required: true, default: 'public', enum: ['public', 'private'] },
    owner: { type: mongoose.Schema.Types.ObjectId , required: true , ref: 'User'},
},  { timestamps: true })
//e
const Story = mongoose.model('Story', storySchema )

module.exports = Story