'use strict';

const express = require('express');
const router = express.Router();
let db = require("../db");


// recuperer elements de sessions !!

router.get('/', function(req, res, next){
    res.render('homepage');
})

module.exports = router;
