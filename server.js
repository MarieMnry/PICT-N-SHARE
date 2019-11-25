'use strict';

///// REQUIRE NODE.JS DEPENDENCIES
const http = require('http');
const { join } = require('path');

///// REQUIRE THIRD-PARTY DEPENDENCIES
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const path = require('path');
const connectMongo = require('connect-mongo');
const MongoClient = require('mongodb').MongoClient;
var mongoClient;
const hbs = require('express-handlebars');

///// REQUIRE INTERN DEPENDENCIES
const db = require('./db');

///// SERVER
const app = express();
const server = http.createServer(app);
var io = socketio.listen(server);

///// PORT
const port = process.env.PORT || 8080;

///// DATABASE
const mongoUri = process.env.mongoUri || 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/test?retryWrites=true&w=majority';
const MongoStore = connectMongo(session);

///// SESSIONS & COOKIES ( a voir une fois Mongo connecté)
app.set('trust proxy', 1);
const sessionMiddleware = session({
    secret: 'bringMeChance',
    name: 'sessionID',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        httpOnly: true,
        secure: false,
    },
    store: new MongoStore({
        url: 'mongodb+srv://marie:Architecture2018@pictcluster-5bvau.mongodb.net/sessions?retryWrites=true&w=majority',
        ttl: 3 * 24 * 60 * 60 // 3jours
    })
})
app.use(sessionMiddleware);



///// FAVICON
app.use(favicon(__dirname + '/public/img/logophotoshop.png'));

///// PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('view engine', 'pug');
app.use('/public', express.static(join(__dirname, 'public')));
app.use(cookieParser());

///// ROUTES
const { home, signup, login, checkpoint, profil, chat } = require('./routage/index');

app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);
app.use('/checkpoint', checkpoint);
app.use('/profil', profil);
app.use('/chat', chat);


app.get('/ajax', function(req, res){
    res.render('ajax.pug', {title: 'Un exemple AJAX'})
});

///// BOX
let box;
app.use(function(req, res, next){
    box = {};
    next();
});

///// WEBSOCKETS
io.on('connection', function(socket){ 
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    }); 
}); 

/////DB
MongoClient.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, 
    function(err, client){
    if(err){
        return;
    }
    mongoClient = client.db('pictnshare');
    app.listen(port, function(){
        console.log('listening on :' + port)
    })
})

///// ERROR




