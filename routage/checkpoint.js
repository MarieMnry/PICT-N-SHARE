'use strict';

const express = require('express');
const router = express.Router();

const {nodemailer, transporter} = require('../mailer.js');

router.get('/', function(req, res){
    res.render('checkpoint.hbs');
});

router.post('/', function(req, res){
    //Variables
    const MongoClient = require('mongodb').MongoClient;
    const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority';
    const { email } = req.body;

    // Connexion à la BdD
    MongoClient.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, (err, client) => {
        if (err) {
            throw err;
        }
        var db = client.db('pictnshare');

        if(email.length > 0){
            db.collection('users').find({email}).toArray(function(err, result) {
                if (err) throw err;
                if(result.length === 0) {
                    res.render('checkpoint.hbs', {message: "Email inconnu !"});
                    console.log('Mail non trouvé');
                } else {
                    console.log('Mail trouvé');
                    res.render('login.hbs', {message: "Un email contenant vos identifiants vous a été envoyé."});
                    
                    // Envoi d'un mail de confirmation d'inscription
                    var mailOptions = {
                        from: '"Admin" <pictnshare@gmail.com>',
                        to: req.body.email,
                        subject: 'Réinitialisation du mot de passe',
                        text: '',
                        html: '<h2>Bonjour</h2><br/><p>Voici le lien de réinitialisation de votre mot de passe : *lien.fr*</p><br/><p>A bientôt sur Pict\'N\'Share,</p><p>Say Cheeeese :D</p><br/><p>Marie, ton admin\' !</p>',
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
            })
        }
    })
})

module.exports = router;