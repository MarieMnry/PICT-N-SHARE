'use strict';

///// REQUIRE NODE.JS DEPENDENCIES
const http = require('http');
const { join } = require('path');

///// REQUIRE THIRD-PARTY DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//ici socket.io
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const path = require('path');
const connectMongo = require('connect-mongo');
const MongoClient = require('mongodb').MongoClient;
const hbs = require('express-handlebars');

///// REQUIRE INTERN DEPENDENCIES
const db = require('./db');
// var hbs = require('hbs');

///// SERVER
const app = express();
const server = http.createServer(app);
//ici declaration variable io = socket.listen...

///// PORT
const port = process.env.port || 3000;

///// FAVICON
app.use(favicon(__dirname + '/public/img/logophotoshop.png'));

///// PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('view engine', 'hbs');
app.use('/public', express.static(join(__dirname, 'public')));
//ici cookier parser

///// DATABASE
const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority'
const MongoStore = connectMongo(session);

async function main () {
    try {
        const conn = await MongoClient.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.use(function(req, res, next) {
            req.db = conn.db('pictCluster');
            next();
        });

        server.listen(port, function () {
            console.log('listening on :', port);
        });
    }
    catch (error) {
        console.log('mongodb is not connected');
        console.log(error);
        
        return;
    }
}
main().catch(console.error);

///// MAILER
// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     port: port,
//     secure: false,
//     service: 'gmail',
//     auth: {
//         user: 'pictnshare@gmail.com',
//         pass: 'enNovembre1920.',
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })
// ici mail général
// var mailOptions = {
//     from: '"Admin" <pictnshare@gmail.com>',
//     to: '<marie_maunoury@hotmail.fr',
//     subject: 'Hello',
//     text: 'Hello',
//     attachments: [
//         {
//           filePath: '/public/img/logophotoshop.png'
//         },
//     ]
// };
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//        return console.log(error);
//     }
//     console.log('Message sent');
// });
// transporter.close();


///// SESSIONS
app.use(session ({
    secret: 'bringMeChance',
    saveUninitialized: false,
    resave: false,
}));

///// ROUTES
const { home, signup, login } = require('./routage/index');

app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);


