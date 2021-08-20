const express = require('express');
const app = express();

//In-memory DB
const cosmeticIdIndex = 1;
const cosmetics = [{
    id: 0,
    name: 'Lipstick',
    color: 'Red'

}];

//Parse incomming JSON
app.use(express.json());

//Resource Endpoints
app.get('/api/cosmetics', (req, res, next) => {
    res.json(cosmetics);
})

app.get('/api/cosmetics/:id', (req, res, next) => {
    const {id} = req.params;

    const cosmetic = cosmetics.find(cosmetic => cosmetic.id == id);
    
    res.json(cosmetic);
})

app.post('/api/cosmetics');
app.put('/api/cosmetics/:id');
app.delete('/api/cosmetics/:id');

//Start the sever
app.listen(3000);