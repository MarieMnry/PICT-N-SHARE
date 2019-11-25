'use strict';

const express = require('express');
const router = express.Router();
let box = {};

router.get('/', function(req, res, next){
    res.render('home.pug');
    box.session = req.session;
    // box.h1 = 'hello je suis le h1';
    console.log('from home: ' + box.session.login);

    if(req.session.login){
        req.session.destroy(function(err){
            console.log('session detruite')
        });
        //on detruit la session
    }
});

module.exports = router;