module.exports.index=function(req,res){
    const username = req.session.username || null;
    const loggedIn = !!username;
    const loginSuccess = req.query.login === 'success';
    res.render('index', { title: 'Eeshanth Reyhanth', username, loggedIn, loginSuccess });
};

module.exports.signin=function(req,res){
    res.render('signin', { title: 'Eeshanth Reyhanth' });
};
module.exports.review=function(req,res){
    res.render('review', { title: 'Eeshanth Reyhanth' });
};