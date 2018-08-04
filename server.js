/*-------------------------------------------------------*/
/*--------------------------HEADER-----------------------*/
/*-------------------------------------------------------*/

var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var consolidate = require('consolidate');

/*
 * THESE VAR WILL BE UPDATED THROUGH ALL THE LOGIN/CREATION PROCESSES
 */
var currentUserProfile = {
  username: "",
  agencyname: "",
  type: "",
  name: "",
  surname: "",
  adress: "",
  email: "",
  gender: "",
  password: ""
};

/*-------------------------------------------------------*/
/*--------------------------HOGAN-----------------------*/
/*-------------------------------------------------------*/

app.engine('html', consolidate.hogan);
app.set('views', 'content');

app.get('/login.html', function(req, res, next) {
  res.render('login.html', {
    currentUsername: currentUserProfile.username
  });
});
app.get('/home.html', function(req, res, next) {
  res.render('home.html', {
    currentUsername: currentUserProfile.username
  });
});
app.get('/orga.html', function(req, res, next) {
  res.render('orga.html', {
    currentUsername: currentUserProfile.username
  });
});
app.get('/profil.html', function(req, res, next) {
  res.render('profil.html', {
    currentUserProfile: currentUserProfile
  });
});
app.get('/aboutus.html', function(req, res, next) {
  res.render('aboutus.html', {
    currentUsername: currentUserProfile.username
  });
});

/*-------------------------------------------------------*/
/*---------------------MONGOCLIENT-----------------------*/
/*-------------------------------------------------------*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*-------------------------------------------------------*/
/*------------------MONGO CONNECTION---------------------*/
/*-------------------------------------------------------*/

var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("organizeitdb");


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
function createUser(req, res, next, newUser, page, success) {

  // var searchQuery = {username : req.query.username};
  // console.log(req.query.username);

  /*
   * INSERT A NEW USER INTO THE DATABASE
   * FIRST CHECK IF THE USER ALREADY EXISTS
   */
  dbo.collection("users").find({
    username: newUser.username
  }).toArray(function(err, result) {
    /*
     * IF THE USER ALREADY EXISTS, THEN OUTPUTS AN ERROR MESSAGE
     */
    if (result.length > 0) {
      res.render(page, {
        errorMessageCreate: "This username already exists. Please find another username!"
      });
      return false;
    }
    /*
     * IF THE PASSWORDS DO NOT MATCH, THEN OUTPUTS AN ERROR MESSAGE
     */
    else if (req.query.confirmPassword != req.query.password) {
      res.render(page, {
        errorMessageCreate2: "The passwords do not match!"
      });
      return false;
    }
    /*
     * IF EVERYTHING MATCH
     */
    else if (result.length < 1 && req.query.confirmPassword == req.query.password) {
      dbo.collection("users").insert(newUser, function(err, res) {
        if (err) throw err;
      });

      currentUserProfile.username = newUser.username;
      currentUserProfile.agencyname = newUser.agencyname || "";
      currentUserProfile.type = newUser.type;
      currentUserProfile.name = newUser.name;
      currentUserProfile.surname = newUser.surname;
      currentUserProfile.adress = newUser.adress;
      currentUserProfile.email = newUser.email;
      currentUserProfile.gender = newUser.gender;
      currentUserProfile.password = newUser.password;

      console.log("create user return true");
      success();
    }
  });
}

app.get('/createaccount', function(req, res, next) {
  var newUser = {
    username: req.query.username,
    type: "client",
    name: req.query.name,
    surname: req.query.surname,
    adress: req.query.adress,
    email: req.query.email,
    gender: req.query.gender,
    password: req.query.password
  };

  createUser(req, res, next, newUser, "login.html", function() {
    res.render('profil.html', {
      currentUserProfile: currentUserProfile
    });
  });
});

/*------------------AGENCY ACCOUNT LISTENER---------------------*/
app.get('/createagency', function(req, res, next) {

  var newAgency = {
    agencyname: req.query.agencyname,
    agencyusername: req.query.agencyusername,
    email: req.query.email,
    phone: req.query.phone,
    password: req.query.password,

    mariage: (req.query.mariage && true) || false,
    anniversaire: (req.query.anniversaire && true) || false,
    music: (req.query.music && true) || false,
    naissance: (req.query.naissance && true) || false,
    bapteme: (req.query.bapteme && true) || false,
    goodnews: (req.query.goodnews && true) || false,
    marketing: (req.query.marketing && true) || false,
    sport: (req.query.sport && true) || false,
    autre: (req.query.autre && true) || false,

    maxbudget: req.query.maxbudget,
    people: req.query.people
  };

  /*
   * INSERT A NEW AGENCY INTO THE DATABASE
   * FIRST CHECK IF THE USER ALREADY EXISTS
   */
  dbo.collection("agencies").find({
    agencyname: req.query.agencyname
  }).toArray(function(err, result) {
    /*
     * IF THE USER ALREADY EXISTS, THEN OUTPUTS AN ERROR MESSAGE
     */
    if (result.length > 0) {
      res.render('orga.html', {
        errorMessageCreate: "This agency already exists. Please find another username!"
      });
    }
    /*
     * IF THE PASSWORDS DO NOT MATCH, THEN OUTPUTS AN ERROR MESSAGE
     */
    else if (req.query.confirmPassword != req.query.password) {
      res.render('orga.html', {
        errorMessageCreate2: "The passwords do not match!"
      });
    }
    /*
     * IF EVERYTHING MATCH
     */
    else if (result.length < 1 && req.query.confirmPassword == req.query.password) {
      var newUser = {
        username: newAgency.agencyusername,
        agencyname: newAgency.agencyname,
        type: "agency",
        email: newAgency.email,
        password: newAgency.password
      };

      createUser(req, res, next, newUser, "orga.html", function() {

        dbo.collection("agencies").insert(newAgency, function(err, res) {
          if (err) throw err;
          console.log("Number of users inserted: " + res.insertedCount);
        });

        console.log(currentUserProfile);
        res.render('profil.html', {
          currentUserProfile: currentUserProfile
        });
      });

    }
  });
});

app.get('/agencies', function(req, res, next) {
  // var searchQuery = {username : req.query.username};
  // console.log(req.query.username);

  /*
   * INSERT A NEW USER INTO THE DATABASE
   * FIRST CHECK IF THE USER ALREADY EXISTS
   */
  dbo.collection("agencies").find({}).toArray(function(err, result) {
    console.log(result);
  });
});

/*------------------LOGIN ACCOUNT LISTENER---------------------*/
app.get('/login', function(req, res, next) {

  // var query = { username: req.query.username };
  // console.log(req.query.username);
  dbo.collection("users").findOne({
    username: req.query.username
  }, function(err, doc) {
    if (err) throw err;

    if (doc != null && doc.password == req.query.password) {

      console.log(doc);

      currentUserProfile.username = doc.username;
      currentUserProfile.agencyname = doc.agencyname || "";
      currentUserProfile.type = doc.type;
      currentUserProfile.name = doc.name;
      currentUserProfile.surname = doc.surname;
      currentUserProfile.adress = doc.adress;
      currentUserProfile.email = doc.email;
      currentUserProfile.gender = doc.gender;
      currentUserProfile.password = doc.password;

      res.render('profil.html', {
        currentUserProfile: currentUserProfile
      });

    } else if (doc == null || doc.name != req.query.username || doc.password != req.query.password) {
      res.render('login.html', {
        errorMessageLogin: "The user neither exists or the password is incorrect. Please try again."
      });
    }

  });

});

app.get('/logout', function(req, res, next) {
  currentUserProfile.username = "";
  currentUserProfile.agencyname = "";
  currentUserProfile.type = "";
  currentUserProfile.name = "";
  currentUserProfile.surname = "";
  currentUserProfile.adress = "";
  currentUserProfile.email = "";
  currentUserProfile.gender = "";
  currentUserProfile.password = "";

  res.render('home.html');
});

/*-------------------------------------------------------*/
/*-------------------------------------------------------*/
/*-------------------------------------------------------*/
/*-------------------------------------------------------*/
app.use(express.static('content'));

// 404 -> first.html
app.use(function(req, res, next) {
  res.redirect("/first.html");
});

app.listen(8080);
