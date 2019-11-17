'use strict';

const express = require('express');
const router = express.Router();
let box = {};

router.get('/', function(req, res, next){
    res.render('home.pug');
    box.session = req.session;
    box.h1 = 'hello je suis le h1';
    console.log(box.session);
});

module.exports = router;