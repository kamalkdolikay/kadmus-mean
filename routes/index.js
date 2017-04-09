import express from 'express';
import cool from 'cool-ascii-faces';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

import user_model from '../models/user_model_passport-jwt.js';
import Passport from '../config/passport-jwt.js';

const router = express.Router();

router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        if (user) {
            return res.json({ token: user.generateJWT() });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

router.post("/login-jwt", function(req, res) {
    user_model.get(req.body, function(err, users) {
        console.log("users ", users)
        if (!users) {
            res.status(401).json({ message: "no such user found" });
        } else if (users.password === req.body.password) {
            var payload = { id: users };
            var token = jwt.sign(payload, 'tasmanianDevil');
            res.json({ message: "ok", token: token });
        } else {
            res.status(401).json({ message: "passwords did not match" });
        }
    });
});

/**
//to be used with passport-jwt
router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ message: "Success! You can not see this without a token" });
});

//decoding token via express
router.get('/some', (req, res) => {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, 'tasmanianDevil');
    res.json({ message: decoded })

});*/

/* GET index page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.all('/home', function(req, res, next) {
    res.render('index');
});

router.get('/dashboard/*', (req, res) => {
    res.render('dashboard');
})

router.get('/posts', (req, res) => {
    user_model.fetch(function(err, docs) {
        res.send(docs);
    })
});

// router.post('/login', (req, res) => {
//     User.get(req.body, function(err, user) {
//         if (user === null) { res.send("empty"); } else { res.send(user); }
//     });
// });

router.get('/cool', function(req, res) {
    res.send(cool());
});

export default router;