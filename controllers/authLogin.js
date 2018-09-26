const User = require('../database/models/User');
const bcrypt = require('bcrypt');
module.exports = (req, res) => {
    // try to find the user email
    const {email, password} = req.body;

    User.findOne({email}, (error, user) => {
        if(user){
        // compare password
            
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    // this will bind the userId with the session key
                    // you can check it where it is required for authentication
                    req.session.userId = user._id;
                    res.redirect('/');
                }
                else{
                    res.redirect('/auth/login');
                }
            });
        }
        else{
            res.redirect('/auth/login');
        }
    })

    // compare user password
    // redirect to homepage with auth token
};