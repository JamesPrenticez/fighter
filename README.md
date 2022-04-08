# fighter

``` node app.js ```
OR
``` npm run dev ```

https://scripterswar.com/tutorial/nodejs
https://www.youtube.com/watch?v=GVuU25pGaYo&t=499s

File communication (Express)
    Client asks server for a file (eg: playerImg.png)

Package communication (Socket.io)
    Client sends data to server (eg: Charater input)
    Server sends data to client (eg: Enemy position)

        mywebsite.com   :3000       /client/playerImg.png
URL=    DOMAIN          PORT        PATH
        laptop          usbport     query

NOTES:
- Will need to better handle number of players with Sockets own api but for now we can just create a custom list.




# SQLITE3 Database w/ Knex
- npx knex migrate:make users
- npx knex migrate:latest
- npx knex seed:run

# Mongo DB
- cd C:/Program Files/MongoDB/Server/5.0/bin mongod - db server
- cd C:/Program Files/MongoDB/Server/5.0/bin mongo - db client

### Create
- use game
- db.createCollection("account");
- db.createCollection("progress");
- db.account.insert({username: "asdf", password: "asdf"});
- db.progress.insert({username: "asdf", level: 123, questCompleted: ["quest1", "quest2", "quest3"]});
### Read
- db.account.find({username: "asdf"})
- db.progress.find({username: "asdf"}, {questCompleted: true})
- db.progress.find({username: "asdf"}, {level: true})
### Update
- db.progress.update({username: "asdf"}, {$set:{level:99}})