const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejs_blog_test');

const Post = require('./database/models/Post');

// Post.create({
//     title: 'Demo Post Title 1',
//     description: 'Some description',
//     content: 'lorem ipsum'
// }),(error, posts) => {
//     console.log(error, posts);
// };

// Post.findOne({},(error, post) => {
//     console.log(error, post);
// });

Post.findById("5ba6712edc0aa1a4c9ba8a30",(error, post) => {
    console.error(error);
})

Post.findByIdAndDelete("5ba6712edc0aa1a4c9ba8a30" , (error, post) => {
    console.log(error, post);
});