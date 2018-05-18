
/*-------------------------------------------------------*/
/*--------------------------HEADER-----------------------*/
/*-------------------------------------------------------*/

var express = require('express');
var app = express ();
var http = require('http');
var fs = require('fs');
var consolidate = require('consolidate');
var currentLogin = "";

/*-------------------------------------------------------*/
/*--------------------------HOGAN-----------------------*/
/*-------------------------------------------------------*/

app.engine ('html', consolidate.hogan);
app.set('views', 'content');

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

    var  administrator = {username : "admin", type: "admin", name: "name", surname: "surname", adress: "Rue de la ferme blanche 10", email: "contact@organizeit.be", gender: "male", password: "admin"};
    var agencies1 = 
    [
    { name : "organize it", adress: "Rue de la ferme blanche, 10. 1490 Court-St-Etienne", email: "contact@organizeit.be", website: "www.organizeit.be", vatnumber: "BE1234567890", phone: "+32477633634"},
    { name : "extra event", adress: "Rue des Pommiers, 20. 1348 Louvain-la-Neuve", email: "mgmt@extraevent.be", website: "www.extraevent.be", vatnumber: "BE0987654321", phone: "+32477633632"},
    { name : "profirst", adress: "Rue des Voitures, 4. 1348 Louvain-la-Neuve", email: "mgmt@extraevent.be", website: "contact@profirst.be", vatnumber: "BE1029384756", phone: "+32477633631"}
    ];

    //console.log(administrator);
    //console.log(administrator.username);
    // addUser(administrator);
    // addAgencies(agencies1);
    

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
        // var searchQuery = {username : req.query.username};
        // console.log(req.query.username);

        /*
         * INSERT A NEW USER INTO THE DATABASE
         * NO CHECK FOR EXISTING USER YET
         */
        dbo.collection("users").insert(newUser, function(err, res) 
        {
            if (err) throw err;
            console.log("Number of users inserted: " + res.insertedCount);
        });

        dbo.collection("users").find({username : req.query.username}).toArray(function(err, result) 
        {
            console.log(result[0].username);


            res.render('profil.html', {username : result[0].username, type: result[0].type, name: result[0].name, surname: result[0].surname, adress: result[0].adress, email: result[0].email, gender: result[0].ender, password: result[0].password});
            dbo.close(); 
        });

    });
});

/*------------------LOGIN ACCOUNT LISTENER---------------------*/
app.get('/login', function(req,res,next) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("organizeitdb");
        // var query = { username: req.query.username };
        // console.log(req.query.username);

        dbo.collection("users").find({username: req.query.username}).toArray(function(err, result)
        {
            if (err) throw err;
            if (result.length>0 && result[0].password ==  req.query.password)
            {
                res.render('profil.html', {username : result[0].username, type: result[0].type, name: result[0].name, surname: result[0].surname, adress: result[0].adress, email: result[0].email, gender: result[0].gender, password: result[0].password});
            } 
            else {
                // login.html.getElementById("errorLogin").style.display="block";
                res.render('login.html', {errorMessageLogin : "The user neither exists or the password is incorrect. Please try again.", block : "block"});
            }

            dbo.close();
        });

    });
});
/*-------------------------------------------------------*/
/*------------------ALL FUNCTIONS---------------------*/
/*-------------------------------------------------------*/
    

        /*------------------USERS RELATED---------------------*/
        // var doesUserExists = undefined;

        // function addUser(insertingUser)
        // {
        //     MongoClient.connect(url, function(err, db) {
        //         if (err) throw err;
        //         var dbo = db.db("organizeitdb");

        //         // console.log("addUser Boolean Test:");
        //         // console.log(insertingUser.username);
        //         //var doesUserExists = userExist(insertingUser.username); //!!!!!!!!!!!!!!!!!!!
        //         //console.log(doesUserExists);

        //         //console.log(doesUserExists);

        //         if(userExist(insertingUser.username)) console.log(".");
        //         if(!userExist(insertingUser.username))
        //             dbo.collection("users").insertOne(insertingUser, function(err, res) {
        //             if (err) throw err;
        //             console.log("Number of users inserted: " + res.insertedCount);
        //             db.close();
        //         });           
        // });
        // }

        // function userExist(inputUsername)
        // {
        // 	MongoClient.connect(url, function(err, db) {
        //         if (err) throw err;
        //         var dbo = db.db("organizeitdb");
        //         // var query = { username: inputUsername.username };
                
        //         // console.log("userExist Input Test:");
        //         // console.log(inputUsername);
        //         dbo.collection("users").find({username : inputUsername}).toArray(function(err, results)
        //         {
                    
        //             if (err) throw err;
        //             // if (results.length!=0)
        //             //     dbo.close();
        //             //     return results.length!=0;
        //             // if (results.length==0)
        //             //     dbo.close();
        //             //     return false;
        //             console.log("doesUserExists Bolean Test");
                    
        //             doesUserExists = results.length!=0;
        //             console.log(doesUserExists);
        //             return results.length!=0;
        //         });
        //     });
        // }

        

        /*------------------AGENCIES RELATED---------------------*/
     //    function angencyExist(inputAgency)
     //    {
     //       MongoClient.connect(url, function(err, db) {
     //        if (err) throw err;
     //        var dbo = db.db("organizeitdb");
     //        var query = { name: inputAgency };

     //        dbo.collection("agencies").find(query).toArray(function(err, results)
     //        {
     //          if (results.length>0)
     //          {
     //             dbo.close(); 
     //             return true;
     //         }
     //         else{
     //             dbo.close(); 
     //             return false;
     //         }
     //     });
     //    });
     //   }



     //   function addAgencies(insertingAgencies)
     //   {
     //     MongoClient.connect(url, function(err, db) {
     //        if (err) throw err;
     //        var dbo = db.db("organizeitdb");

            

     //        for (i = 0; i < insertingAgencies.length ; i++) 
     //        {
     //            console.log(String(userExist(insertingAgencies[i])));
     //            if(angencyExist(insertingAgencies[i])==true)
     //            {
     //             console.log(".");

     //         }
     //         else
     //         {

     //             dbo.collection("agencies").insertOne(insertingAgencies[i], function(err, res) {
     //                if (err) throw err;
     //                console.log("Number of agencies inserted: " + res.insertedCount);
     //                db.close();
     //            });


     //         }
     //     }
     // });
     // }
     // function addAgency(insertingAgency)
     // {
     //     MongoClient.connect(url, function(err, db) {
     //        if (err) throw err;
     //        var dbo = db.db("organizeitdb");

     //        if(angencyExist(insertingAgency)==true){

     //            console.log(".");
     //        }
     //        else
     //        {
     //            dbo.collection("agencies").insertOne(insertingAgency, function(err, res) {
     //                if (err) throw err;
     //                console.log("Number of agencies inserted: " + res.insertedCount);
     //                db.close();
     //            });

     //        }
     //    });
     // }





     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     /*-------------------------------------------------------*/
     app.use(express.static('content'));

     app.use(function (req, res, next) {
      res.status(404).send("<h1>404 Page Not Found !</h1> <br> <hr> <h3><a href='home.html'>Clic here to go back to homepage</a></h3>")
  });

     app.listen(8080);