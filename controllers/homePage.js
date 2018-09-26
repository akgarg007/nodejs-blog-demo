const Post = require('../database/models/Post');

module.exports = async(req, res) => {
    const posts = await Post.find({}).populate('author');  
    // await function holds the request until it resolve than it goes to the next line request 
    // console.log(posts);  
  // console.log(req.session);
    res.render('index', {posts});
}