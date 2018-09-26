const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    subheading: String,
    content: String,
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        // this user_id is referecing to the User collection in the mongoDB database
        ref: 'User',
        required: true
    },

    created_at: {
        type: Date,
        default: new Date()
    },
    image:String
});

// this represents the collection in the database
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;