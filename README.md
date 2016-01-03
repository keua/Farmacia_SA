
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Welcome to your Node.js project on Cloud9 IDE!

This chat example showcases how to use `socket.io` with a static `express` server.

## Running the server

1) Open `server.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    $ node server.js

Once the server is running, open the project in the shape of 'https://projectname-username.c9.io/'. As you enter your name, watch the Users list (on the left) update. Once you press Enter or Send, the message is shared with all connected clients.


{
    "mount": 100,
    "client_id": 1,
    "employee_id": 2,
    "drugstore_id": 2,
    "medicines": [
        {
            "medicine_id": 1,
            "quantity":    1     
        },
        {
            "medicine_id": 2,
            "quantity":    1     
        },
        {
            "medicine_id": 2,
            "quantity":    1     
        }    
    ],
    "payments": [
        {
            "payment_id": 1,
            "mount": 50,
            "surcharge": 0
        },
        {
            "payment_id": 2,
            "mount": 50,
            "surcharge": 2.5 
        }
    ]
}

GIT COMMANDS

Revertir version 
	git reset --hard <old-commit-id>
	
	git push -f <remote-name> <branch-name> 

Para hacer commits (en teoria no deberian de haber conflictos porque cada quien estara trabajando en modulos distintos)

    git pull origin master

    git add -A

    git commit -m "breve comentario sobre el commit"

    git push origin master
