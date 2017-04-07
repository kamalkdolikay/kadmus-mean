import express from 'express';
import User from '../models/User.js';
import cool from 'cool-ascii-faces';

const router = express.Router();

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
    res.render('dashboard')
})

router.get('/posts', (req, res) => {
    User.find({}, function(err, docs) {
        res.send(docs)
    })
});

router.get('/cool', function(req, res) {
    res.send(cool());
});

export default router;