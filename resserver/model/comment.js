const mongoose = require('mongoose');

//Comment Schema
const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},
    {collection:'Comments'}
);

const Comment = module.exports = mongoose.model('Comment',CommentSchema);
