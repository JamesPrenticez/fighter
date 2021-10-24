# fighter

``` node app.js ```

https://scripterswar.com/tutorial/nodejs

File communication (Express)
    Client asks server for a file (eg: playerImg.png)

Package communication (Socket.io)
    Client sends data to server (eg: Charater input)
    Server sends data to client (eg: Enemy position)

        mywebsite.com   :2000       /client/playerImg.png
URL=    DOMAIN          PORT        PATH
        laptop          usbport     query

NOTES:
- Will need to better handle number of players with Sockets own api but for now we can just create a custom list.