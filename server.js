const express = require('express');
const cosmeticsRouter = require('./cosmetics.router');

//Create server application
const app = express();

//Parse incomming JSON
app.use(express.json());

//Add resources
app.use(cosmeticsRouter);

//Start the sever
app.listen(3000);