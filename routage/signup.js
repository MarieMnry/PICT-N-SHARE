'use strict';

const express = require('express');
const router = express.Router();

let box = {};
const {nodemailer, transporter} = require('../mailer.js');

router.get('/', function(req, res, next){
    res.render('signup');
    box.session = req.session;
})

router.post('/', function(req, res){
    // Variables
    const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority';
    const MongoClient = require('mongodb').MongoClient;
    const { login, password, passwordBis, email } = req.body;

    // Connexion à la BdD
    MongoClient.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, (err, client) => {
        if (err) {
            throw err;
        } else {
            var db = client.db('pictnshare'); // version mongo ^3.0.1, callback renvoie client et plus db 
            const users = db.collection("users");
            users.find({ login }).toArray(function(err, result){
                if (err) {
                    throw err;
                } else {
                    if(result.length !== 0){
                        res.render('signup', {message: "Oops ce login est déjà pris ! Allez, trouves-en un mieux."});
                        console.log("Same login, choose another one !");
                    }else if(password !== passwordBis){
                        res.render('signup', {message: "Tes mots de passe ne correspondent pas ! Je t'invite à recommencer."});
                        console.log("Not same passwords");
                    } else {
                        users.insertOne({ login, password, email});
                        console.log("1 document inserted");
                        req.session.login = login;
                        req.session.email = email;
                        console.log('from login :' + req.session.login);
                        res.redirect('profil');
                        
                        // Envoi d'un mail de confirmation d'inscription
                        var mailOptions = {
                        from: '"Admin" <pictnshare@gmail.com>',
                        to: req.body.email,
                        subject: 'Confirmation d\'inscription',
                        text: '',
                        html: '<h2>Hey ' + req.body.login + ' :)<h2><p>Bienvenue et merci pour ton inscription !</p><p>Tu peux dès à présent profiter des meilleurs spots photos sur Paris !</p><br><p>A bientôt sur Pict\'N\'Share,</p><p>Say Cheeeese :D</p><br><p>Marie, ton admin\' !</p>',
                        attachments: [{
                        filename: 'logophotoshop.png',
                        path: './public/img/logophotoshop.png',
                        }]
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                        return console.log(error);
                        }
                        console.log('Message sent');
                        });
                        transporter.close();
                    }
                    client.close(function(){
                        console.log('J\'ai fais mon boulot ! BdD refermée');
                    });
                }
            });
        }
    })
});
        
module.exports = router;
