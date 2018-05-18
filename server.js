
/*-------------------------------------------------------*/
/*--------------------------HEADER-----------------------*/
/*-------------------------------------------------------*/

var express = require('express');
var app = express ();
var http = require('http');
var fs = require('fs');
var consolidate = require('consolidate');

/*
* THESE VAR WILL BE UPDATED THROUGH ALL THE LOGIN/CREATION PROCESSES
*/
var currentLogin = "";
var errorCreate = "";
var errorCreate2 = "";
var errorConnect = "";
var currentUserProfile = {username : "", 
    type: "",
    name: "", 
    surname: "", 
    adress: "", 
    email: "", 
    gender: "", 
    password: ""};

    /*
    * CANT MAKE THIS FUNCTION WORK INSIDE THE PROFIL.HTML.
    * THE SCRIPT IMPORT DOES NOT WORK AS EXPECTED. NORMALLY
    * THE LOGOUT BUTTON INSIDE PROFIL.HTML SHOULD CALL THIS FUNCTION WITH A ONCLICK
    * AND RESET THE CURRENTUSERPROFILE OBJECT AND 
    * RENDER THE HOMEPAGE AGAIN WITH A REINIT USER PROFILE
    */

    function logOut()
    {
        currentLogin = "";
        errorConnect = "";

        currentUserProfile.username = "";
        currentUserProfile.type = "";            
        currentUserProfile.name = ""; 
        currentUserProfile.surname = "";  
        currentUserProfile.adress = "";  
        currentUserProfile.email = "";  
        currentUserProfile.gender = "";  
        currentUserProfile.password = "";
    }

/*-------------------------------------------------------*/
/*--------------------------HOGAN-----------------------*/
/*-------------------------------------------------------*/

app.engine ('html', consolidate.hogan);
app.set('views', 'content');

app.get('/login.html', function(req,res,next) {
    res.render('login.html',{currentUsername : currentLogin});
});
app.get('/home.html', function(req,res,next) {
    res.render('home.html',{currentUsername : currentLogin});
});
app.get('/profil.html', function(req,res,next) {
    res.render('profil.html',{username : currentUserProfile.username, type: currentUserProfile.type, name: currentUserProfile.name, surname: currentUserProfile.surname, adress: currentUserProfile.adress, email: currentUserProfile.email, gender: currentUserProfile.gender, password: currentUserProfile.password, currentUsername : currentLogin});
});
app.get('/aboutus.html', function(req,res,next) {
    res.render('aboutus.html',{currentUsername : currentLogin});
});

/*-------------------------------------------------------*/
/*---------------------MONGOCLIENT-----------------------*/
/*-------------------------------------------------------*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*-------------------------------------------------------*/
/*------------------MONGO CONNECTION---------------------*/
/*-------------------------------------------------------*/

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("organizeitdb");


  /*----------------DROP OLD COLLECTIONS-------------------*/

  // dbo.collection("users").drop(function(err, delOK) {
  //   if (err) console.log("No Collection with users was found");
  //   if (delOK) console.log("Collections Users dropped");
  //   });

  // dbo.collection("agencies").drop(function(err, delOK) {
  //   if (err) 
  //    console.log("No Collection with agencies was found");
  //   if (delOK) console.log("Collections Agencies dropped");
  //   });

    /*--------------------CREATING NEW COLLECTIONS--------------------*/
});

/*-------------------------------------------------------*/
/*------------------QUERY TREATEMENT---------------------*/
/*-------------------------------------------------------*/

/*------------------CREATE ACCOUNT LISTENER---------------------*/
app.get('/createaccount', function(req,res,next) {

    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("organizeitdb");
        var newUser = {username : req.query.username, type: "client", name: req.query.name, surname: req.query.surname, adress: req.query.adress, email: req.query.email, gender: req.query.gender, password: req.query.password};
        // var searchQuery = {username : req.query.username};
        // console.log(req.query.username);

        /*
         * INSERT A NEW USER INTO THE DATABASE
         * FIRST CHECK IF THE USER ALREADY EXISTS
         */
        dbo.collection("users").find({username : req.query.username}).toArray(function(err, result) 
        {
            /*
            * IF THE USER ALREADY EXISTS, THEN OUTPUTS AN ERROR MESSAGE
            */
            if (result.length>0)
            {
                errorCreate = "This username already exists. Please find another username!"
                res.render('login.html', {errorMessageCreate : errorCreate });
            } 
            /*
            * IF THE PASSWORDS DO NOT MATCH, THEN OUTPUTS AN ERROR MESSAGE
            */
            else if (req.query.confirmPassword!=req.query.password)
            {
                errorCreate2 = "The passwords do not match!";
                res.render('login.html', {errorMessageCreate2 : errorCreate2 });
            } 
            /*
            * IF EVERYTHING MATCH
            */
            else if (result.length<1 && req.query.confirmPassword==req.query.password)
            {
                errorCreate = "";
                errorCreate2 = "";
                errorConnect = "";
                dbo.collection("users").insert(newUser, function(err, res) 
                {
                    if (err) throw err;
                    // console.log("Number of users inserted: " + res.insertedCount);
                });

                dbo.collection("users").find({username : req.query.username}).toArray(function(err, result) 
                {

                    currentLogin = doc.username;
                    currentUserProfile.username = result[0].username;
                    currentUserProfile.type = result[0].type;            
                    currentUserProfile.name = result[0].name; 
                    currentUserProfile.surname = result[0].surname;  
                    currentUserProfile.adress = result[0].adress;  
                    currentUserProfile.email = result[0].email;  
                    currentUserProfile.gender = result[0].gender;  
                    currentUserProfile.password = result[0].password;

                    res.render('profil.html', {username : result[0].username, type: result[0].type, name: result[0].name, surname: result[0].surname, adress: result[0].adress, email: result[0].email, gender: result[0].ender, password: result[0].password});
                    dbo.close(); 
                });

            }    
        });
    });
});
/*------------------AGENCY ACCOUNT LISTENER---------------------*/

// app.get('/createagency', function(req,res,next) {

    
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("organizeitdb");
//         var newAgency = {agencyname: req.query.agencyname, username : req.query.username, email: req.query.email, phone: req.query.phone, password: req.query.password};
//         // var searchQuery = {username : req.query.username};
//         // console.log(req.query.username);

//         /*
//          * INSERT A NEW USER INTO THE DATABASE
//          * FIRST CHECK IF THE USER ALREADY EXISTS
//          */
//         dbo.collection("agencies").find({agencyname : req.query.agencyname}).toArray(function(err, result) 
//         {
//             /*
//             * IF THE USER ALREADY EXISTS, THEN OUTPUTS AN ERROR MESSAGE
//             */
//             if (result.length>0)
//             {
//                 errorCreate = "This agency already exists. Please find another username!"
//                 res.render('login.html', {errorMessageCreate : errorCreate });
//             } 
//             /*
//             * IF THE PASSWORDS DO NOT MATCH, THEN OUTPUTS AN ERROR MESSAGE
//             */
//             else if (req.query.confirmPassword!=req.query.password)
//             {
//                 errorCreate2 = "The passwords do not match!";
//                 res.render('login.html', {errorMessageCreate2 : errorCreate2 });
//             } 
//             /*
//             * IF EVERYTHING MATCH
//             */
//             else if (result.length<1 && req.query.confirmPassword==req.query.password)
//             {
//                 errorCreate = "";
//                 errorCreate2 = "";
//                 errorConnect = "";
//                 dbo.collection("users").insert(newUser, function(err, res) 
//                 {
//                     if (err) throw err;
//                     // console.log("Number of users inserted: " + res.insertedCount);
//                 });

//                 dbo.collection("users").find({username : req.query.username}).toArray(function(err, result) 
//                 {

//                     currentLogin = doc.username;
//                     currentUserProfile.username = result[0].username;
//                     currentUserProfile.type = result[0].type;            
//                     currentUserProfile.name = result[0].name; 
//                     currentUserProfile.surname = result[0].surname;  
//                     currentUserProfile.adress = result[0].adress;  
//                     currentUserProfile.email = result[0].email;  
//                     currentUserProfile.gender = result[0].gender;  
//                     currentUserProfile.password = result[0].password;

//                     res.render('profil.html', {username : result[0].username, type: result[0].type, name: result[0].name, surname: result[0].surname, adress: result[0].adress, email: result[0].email, gender: result[0].ender, password: result[0].password});
//                     dbo.close(); 
//                 });

//             }    
//         });
//     });
// });

/*------------------LOGIN ACCOUNT LISTENER---------------------*/
app.get('/login', function(req,res,next) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("organizeitdb");
        // var query = { username: req.query.username };
        // console.log(req.query.username);

        dbo.collection("users").findOne({username: req.query.username}, function(err, doc)
        {
            if (err) throw err;
            if (doc!=null && doc.password ==  req.query.password)
            {
                currentLogin = doc.username;
                errorConnect = "";

                currentUserProfile.username = doc.username;
                currentUserProfile.type = doc.type;            
                currentUserProfile.name = doc.name; 
                currentUserProfile.surname = doc.surname;  
                currentUserProfile.adress = doc.adress;  
                currentUserProfile.email = doc.email;  
                currentUserProfile.gender = doc.gender;  
                currentUserProfile.password = doc.password;

                res.render('profil.html', {username : doc.username, type: doc.type, name: doc.name, surname: doc.surname, adress: doc.adress, email: doc.email, gender: doc.gender, password: doc.password, currentUsername : currentLogin});
                
                

                
                // document.getElementById('currentUsername').value = currentLogin;
            } 
            else if (doc.name!=req.query.username || doc.password !=  req.query.password)
            {
                errorConnect = "The user neither exists or the password is incorrect. Please try again.";
                res.render('login.html', {errorMessageLogin : errorConnect});
            }

            dbo.close();
        });

    });
});


     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     app.use(express.static('content'));

     app.use(function (req, res, next) {
      res.status(404).send("<h1>404 Page Not Found !</h1> <br> <hr> <h3><a href='First.html'>Clic here to go back to homepage</a></h3>")
  });

     app.listen(8080);