'use strict';

const express = require('express');
const router = express.Router();

let box = {};

router.get('/', function(req, res, next){
    res.render('login');
    box.session = req.session;
})

router.post('/', function(req, res){
    //Variables
    const MongoClient = require('mongodb').MongoClient;
    const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority';
    const { login, password } = req.body;

    // Connexion à la BdD
    MongoClient.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, (err, client) => {
        if (err) {
            throw err;
        }
        var db = client.db('pictnshare'); // version mongo ^3.0.1, callback renvoie client et plus db !

        if(login.length >= 5 && login.length <= 15 && password.length >= 6){
            db.collection('users').find({login, password}).toArray(function(err, result) {
                if (err) throw err;
                if(result.length === 0) {
                    res.render('login', {message: 'Saisie invalide. Tu sembles inconnu au bataillon !'});
                    console.log('Oops ! Pas trouvé !');
                } else {
                    console.log('User trouvé dans la BdD : ' + result[0].login);
                    req.session.login = result[0].login;
                    // if()
                    res.redirect('homepage');
                }
                client.close(function(){
                    console.log('J\'ai fais mon boulot ! BdD refermée');
                });
            });
        }
    });
})

module.exports = router;