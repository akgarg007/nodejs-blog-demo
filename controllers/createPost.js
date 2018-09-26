module.exports = (req, res) => {
    if(req.session.userId){
        // console.log(req.session.userId);
        return res.render('create');
    }
    else{
        res.redirect('/auth/login');
    }
}