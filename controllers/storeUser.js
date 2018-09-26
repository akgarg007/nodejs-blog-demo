const User = require('../database/models/User');
const bcrypt = require('bcrypt');
module.exports = (req, res) => {
    // console.log(req.body);
    
        // console.log(User.findOne({}));

        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            user.save()
          });
          console.log(res.user);
        res.redirect('/');

};