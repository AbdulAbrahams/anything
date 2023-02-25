const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'logged in', (err, decodedToken) => {
           if(err) {
            res.redirect('/login');
            console.log(err);
           } else {
            console.log(decodedToken);
            next();
           }
        })
    }else {
        res.redirect('/login');
    }
}

module.exports = { Auth };