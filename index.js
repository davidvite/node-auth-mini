
require('dotenv').config ({path: __dirname + '/.env'})
const express = require('express');
const session = require('express-session');
// framework
const passport = require('passport');
//plugin for the framework
const LocalStrategy = require('passport-Local').Strategy;
const massive = require('massive');



const app = express();

massive(process.env.DB_CONECTION_STRING, {scripts: __dirname + '/db'})
.then(db => {
    console.log('connected');
    app.set('db',db)
})
.catch(err => {
    console.log(err);
})

//adding local strategy to passport
passport.use(new LocalStrategy({
    usernameField: 'email',
}, (email , password, done) => {
    // anything inside this function is waht we are going to do wiht this user to see if it valid
    if(!email || !password){
        return next({message: "Email and password are requires"});
    }

    const db = app.get('db');
    //Same as  -> SELECT * FROM  'USERS' WHERE email = ${email}
    db.Users.find({email})
    .then(userResults.length == 0) {
        return done({message : 'Username or password is invalid'});
    }

}));



const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );