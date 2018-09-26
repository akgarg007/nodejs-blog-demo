// const User = require('../database/models/User');

module.exports = (req, res, next) => {
    
    // User.findByIdAndDelete(req.session.userId, (error, loggedOut) => {
    //     if(loggedOut) {
    //         return res.redirect('/');
    //     }
    // });
    console.log('logout');
    req.session.destroy(() => {
        res.redirect('/');
    });

    // next();
};