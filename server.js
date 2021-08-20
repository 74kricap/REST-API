const express = require('express');
const cosmeticsRouter = require('./cosmetics.router');

//Create server application
const app = express();

//Parse incomming JSON
app.use(express.json());

//Add resources
app.use(cosmeticsRouter);

//Error handler
app.use((err, req, res, next) => {
    console.trace(err);
    res.status(500).json('Something went wrong...');
})

//Start the sever
app.listen(3000);