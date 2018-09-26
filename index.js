const cool = require('cool-ascii-faces');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const edge = require('edge.js');
// connect-mongo package is used to store suer session in the database
const connectMongo = require('connect-mongo');

const fileUpload = require('express-fileupload');


// mongoose.connect('mongodb://localhost/nodejs_blog');
mongoose.connect('mongodb+srv://akgarg007:vFr2l4ajGc4bux9M@cluster0-bwmrr.mongodb.net/nodejs_blog');

// here we are storing express session in the mongoStore
const mongoStore = connectMongo(expressSession);
// this will generate the session key
app.use(expressSession({
    secret: 'secret_string',
    store: new mongoStore({
        // here we are storing mongoose connection that we have already connected in the  
        // mongooseConnection variable to reuse it.
        mongooseConnection: mongoose.connection
    })
}));




// all assets in public directory
// middlewares are the functions dat express executes before requests coming from the browser

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');
const logoutUserController = require('./controllers/logoutUser');
const authLoginController = require('./controllers/authLogin');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const auth = require('./middleware/auth'); 

app.use(express.static('public'));

// Automatically sets view engine and adds dot notation to app.render
app.use(require('express-edge'));
app.use(fileUpload());

// every root uses default path with views folder to render pages
app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
// here we will register global middleware to access it in all the pages rendered by the edge 
//  templating engine
// using this global function, the auth middleware should be available to the edge pages
    edge.global('auth', req.session.userId);
    next();
});

// bodyParser converts the data coming form frontend html form into nodejs readable data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePostMiddleware = require('./middleware/storePost');
// app.use('/posts/store', storePostMiddleware);


app.get('/', homePageController);
app.get('/posts/new', auth ,createPostController);
app.get('/post/:id', getPostController);
app.post('/posts/store', auth, storePostMiddleware ,storePostController);
app.get('/auth/register', redirectIfAuthenticated, createUserController);
app.post('/users/register', storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginUserController);
app.post('/users/login', authLoginController);
app.get('/auth/logout' ,logoutUserController);

app.get('/about',(req, res) => {
    res.render('about');
});
app.get('/contact',(req, res) => {
    res.render('contact');
});

app.get('/cool', (req, res) => res.send(cool()));
// app.listen(4000, (req, res) => {
//     console.log('express started on port 4000!');
// });

app.listen(process.env.PORT || 4000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});