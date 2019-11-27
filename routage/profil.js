'use strict';

const express = require('express');
const router = express.Router();
let db = require("../db");
const ObjectID = require('mongodb').ObjectID;

var box = {};
// recuperer elements de sessions !!

router.get('/', function(req, res, next){
    if(req.session.login){
        res.render("profil.hbs", {login: req.session.login, email: req.session.email});
        box.session = req.session;
        console.log("from profil: " + box.session.login + box.session.email);

    } else {
        console.log("Access denied");
        res.render("home.pug", { message: "Merci de vous identifier !"});
    }
});

router.post('/', function(req, res, next){
//Variables
    const MongoClient = require('mongodb').MongoClient;
    const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority';

    var login = req.session.login;
    const {prenom, nom, genre, age, ville} = req.body;

// Connexion à la BdD
    MongoClient.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, (err, client) => {
        if (err) {
            throw err;
        } else {
            var db = client.db('pictnshare'); // version mongo ^3.0.1, callback renvoie client et plus db !
            const users = db.collection("users");

            users.findOneAndUpdate({
                _id: ObjectID(req.body.currentUserId)
                },{ $push: { prenom : req.body.prenom }
            }, function(err, result){
                if(err){
                    throw err;
                } else {
                    users.insertOne({ prenom});
                    console.log('L\'ajout de la saisie a fonctionné');
                    res.redirect('profil');
                }
            })

        }  
    });
});

module.exports = router;