
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

    var administrator = {username : "admin", type: "admin", name: "name", surname: "surname", adress: "Rue de la ferme blanche 10", email: "contact@ognaizeit.be", gender: "male", password: "admin"};
    var agencies1 = 
    [
    { name : "organize it", adress: "Rue de la ferme blanche, 10. 1490 Court-St-Etienne", email: "contact@organizeit.be", website: "www.organizeit.be", vatnumber: "BE1234567890", phone: "+32477633634"},
    { name : "extra event", adress: "Rue des Pommiers, 20. 1348 Louvain-la-Neuve", email: "mgmt@extraevent.be", website: "www.extraevent.be", vatnumber: "BE0987654321", phone: "+32477633632"},
    { name : "profirst", adress: "Rue des Voitures, 4. 1348 Louvain-la-Neuve", email: "mgmt@extraevent.be", website: "contact@profirst.be", vatnumber: "BE1029384756", phone: "+32477633631"}
    ];

    addUser(administrator);
    addAgencies(agencies1);
    

//dbo.collection("agencies").insertMany(agencies1, function(err, res) {
  //  if (err) throw err;
  //  console.log("Number of agencies inserted: " + res.insertedCount);
   // db.close();
// });

//dbo.collection("users").insertOne(administrator, function(err, res) {
  //  if (err) throw err;
   // console.log("Number of users inserted: " + res.insertedCount);
   // db.close();
//});
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

    dbo.collection("users").insert(newUser, function(err, res) {
     if (err) throw err;
     console.log("Number of users inserted: " + res.insertedCount);
 });

    dbo.collection("users").findOne({}, function(err, doc) {
        res.render('profile.html', {username : doc.username, type: doc.type, name: doc.name, surname: doc.surname, adress: doc.adress, email: doc.email, gender: doc.ender, password: doc.password});
        dbo.close(); 
    });

});
});

/*------------------LOGIN ACCOUNT LISTENER---------------------*/
app.get('/login', function(req,res,next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("organizeitdb");
    var query = { username: req.query.username };

    dbo.collection("users").find(query).toArray(function(err, results)
    {
      if (results.length>0)
        res.render('profile.html', {username : results[0].username, type: results[0].type, name: results[0].name, surname: results[0].surname, adress: results[0].adress, email: results[0].email, gender: results[0].ender, password: results[0].password});
    dbo.close(); 
});

});
});
/*-------------------------------------------------------*/
/*------------------ALL FUNCTIONS---------------------*/
/*-------------------------------------------------------*/
        //function verifyLogin(inputUsername, dbUsername)
        //{
         // if (inputUsername.localCompare(dbUsername)==0) return true;
           // else return false;
        //}

        /*------------------USERS RELATED---------------------*/
        function userExist(inputUsername)
        {
        	MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("organizeitdb");
                var query = { username: inputUsername };

                dbo.collection("users").find(query).toArray(function(err, results)
                {
                  if (results.length>0)
                  {
                     dbo.close(); 
                     return true;
                 }
                 else
                 {
                     dbo.close(); 
                     return false;
                 }
             });
            });
        }

        function addUser(insertingUser)
        {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("organizeitdb");

                console.log(String(userExist(insertingUser)));
                if(userExist(insertingUser)==true)
                {
                 console.log(".");
                }
             else
             {
                dbo.collection("users").insertOne(insertingUser, function(err, res) {
                    if (err) throw err;
                    console.log("Number of users inserted: " + res.insertedCount);
                    db.close();
                });           
            }
        });
        }

        /*------------------AGENCIES RELATED---------------------*/
        function angencyExist(inputAgency)
        {
           MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("organizeitdb");
            var query = { name: inputAgency };

            dbo.collection("agencies").find(query).toArray(function(err, results)
            {
              if (results.length>0)
              {
                 dbo.close(); 
                 return true;
             }
             else{
                 dbo.close(); 
                 return false;
             }
         });
        });
       }



       function addAgencies(insertingAgencies)
       {
         MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("organizeitdb");

            

            for (i = 0; i < insertingAgencies.length ; i++) 
            {
                console.log(String(userExist(insertingAgencies[i])));
                if(angencyExist(insertingAgencies[i])==true)
                {
                 console.log(".");

             }
             else
             {

                 dbo.collection("agencies").insertOne(insertingAgencies[i], function(err, res) {
                    if (err) throw err;
                    console.log("Number of agencies inserted: " + res.insertedCount);
                    db.close();
                });


             }
         }
     });
     }
     function addAgency(insertingAgency)
     {
         MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("organizeitdb");

            if(angencyExist(insertingAgency)==true){

                console.log(".");
            }
            else
            {
                dbo.collection("agencies").insertOne(insertingAgency, function(err, res) {
                    if (err) throw err;
                    console.log("Number of agencies inserted: " + res.insertedCount);
                    db.close();
                });

            }
        });
     }





     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     app.use(express.static('content'));

     app.use(function (req, res, next) {
      res.status(404).send("<h1>404 Page Not Found !</h1> <br> <hr> <h3><a href='home.html'>Clic here to go back to homepage</a></h3>")
  });

     app.listen(8080);