import express from 'express';
import User from '../models/User.js';
import jwt from 'express-jwt';
const auth = jwt({ secret: 'SECRET', userProperty: payload });

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/posts', (req, res) => {
    User.find({}, function(err, docs) {
        res.send(docs)
    })
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

export default router;