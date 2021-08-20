const express = require('express');
const app = express();

//In-memory DB
const cosmetics = [];

//Parse incomming JSON
app.use(express.json());

//Resource Endpoints
app.get('/api/cosmetics', (req, res, next) => {
    res.json([]);
})

app.get('/api/cosmetics/:id', (req, res, next) => {
    res.json('');
})

app.post('/api/cosmetics');
app.put('/api/cosmetics/:id');
app.delete('/api/cosmetics/:id');

//Start the sever
app.listen(3000);