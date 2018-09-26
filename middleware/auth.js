const User = require('../database/models/User');

module.exports = (req, res, next) => {
    // fetch user form database
    // verify the user
    // if user is valid permit request 
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            // res.status(404);
            return res.redirect('/');
        }
         // else move to next request
        next();
    });
   
    
};