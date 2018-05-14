
/*-------------------------------------------------------*/
/*--------------------------HEADER-----------------------*/
/*-------------------------------------------------------*/

var express = require('express');
var app = express ();
var http = require('http');
var fs = require('fs');
var consolidate = require('consolidate');

/*-------------------------------------------------------*/
/*--------------------------HOGAN-----------------------*/
/*-------------------------------------------------------*/

app.engine ('html', consolidate.hogan);
app.set('views', 'private');

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


  dbo.collection("users").drop(function(err, delOK) {
    if (err) throw err;
  });
  dbo.collection("agencies").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collections initiated");
  });
 
 /*--------------------CREATING NEW COLLECTIONS--------------------*/

  var users1 = 
  [
    { username : 'andres95', type: 'client', name: 'andres', surname: 'fernandes', adress: 'Rue de la ferme blanche, 10. 1490 Court-St-Etienne', email: 'andres.fernandes@student.uclouvain.be', gender: 'male', password: '1234'},
    { username : 'elio234', type: 'client', name: 'elio', surname: 'pani', adress: 'Rue des Pommiers, 20. 1348 Louvain-la-Neuve', email: 'elio.pani@student.uclouvain.be', gender: 'male', password: '5678'},
    { username : 'vincent1976', type: 'client', name: 'vincent', surname: 'verpoten', adress: 'Rue des Voiture, 4. 1348 Louvain-la-Neuve', email: 'vincent.verpoten@student.uclouvain.be', gender: 'male', password: '9123'}
  ];

  var agencies1 = 
  [
    { name : "organize it", adress: "Rue de la ferme blanche, 10. 1490 Court-St-Etienne", email: "contact@organizeit.be", website: "www.organizeit.be", vatnumber: "BE1234567890", phone: "+32477633634"},
    { name : "extra event", adress: "Rue des Pommiers, 20. 1348 Louvain-la-Neuve", email: "mgmt@extraevent.be", website: "www.extraevent.be", vatnumber: "BE0987654321", phone: "+32477633632"},
    { name : "profirst", adress: "Rue des Voitures, 4. 1348 Louvain-la-Neuve", email: "mgmt@extraevent.be", website: "contact@profirst.be", vatnumber: "BE1029384756", phone: "+32477633631"}
  ];

  dbo.collection("users").insertMany(users1, function(err, res) {
    if (err) throw err;
    console.log("Number of users inserted: " + res.insertedCount);
  });

  dbo.collection("agencies").insertMany(agencies1, function(err, res) {
    if (err) throw err;
    console.log("Number of agencies inserted: " + res.insertedCount);
    db.close();
  });
});

/*-------------------------------------------------------*/
/*------------------QUERY TREATEMENT---------------------*/
/*-------------------------------------------------------*/

app.get('/question', function(req,res,next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("organizeitdb");
    

    	dbo.collection("users").findOne({}, (err, doc) => {
      	res.render('profile.html', {username: doc.username, name: doc.name, surname: doc.surname});
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
  res.status(404).send("<h1>404 Page Not Found !</h1> <br> <hr> <h3><a href='home.html'>Clic here to go back to homepage</a></h3>")
});



app.listen(8080);

