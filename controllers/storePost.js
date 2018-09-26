const Post = require('../database/models/Post');
const path = require('path');
module.exports = (req, res) => {
        // const title = req.body.title;
    // console.log(req.files);

    // this function gives the req.files
    // app.use(fileUpload());

    const {image} = req.files;
    // console.log(image.name);
    // this (image.mv)  move function uploads the image in the public/posts folder
    // first parameter is the path of the directory and 2nd isthe callback fxn

    // and also set the directory one level up to go into the public/posts folder
    image.mv(path.resolve(__dirname, '../public/posts', image.name),(error) => {
        Post.create({
            ...req.body,
            image: '/posts/'+image.name,
            author: req.session.userId
        },(error, post) => {
            // console.log(req.body);
            res.redirect('/');
        });
    });
};