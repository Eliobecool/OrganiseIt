README:

To launch the project, you must:

1) Open a Terminal Shell in “organizeit/data/db” and launch the command:

mongod --dbpath “path”

where “path” is the complete path to the organizeit/data/db folder. This will create and initialize the database on port 27017.

2) Open another Terminal Shell in “organizeit” and launch the command:

node server.js

this will launch the sever and add 3 agencies and 3 users in the database. Also, it will listen on port 8080 on the browser for web pages.

3) Open a Terminal Shell in “organizeit/data/db” and launch the command:

mongo

this will start the mongodb utility. First acces the database with 
"use organizeitdb"
then find all the agencies and users by typing "db.agencies.find()" and 'db.users.find()"
