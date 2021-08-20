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
    const { id } = req.params;
    const cosmetic = cosmetics.find(cosmetic => cosmetic.id == id);
    if(!cosmetic){
        res.status(404).json('Cosmetic with id ${id} was not found!');
    } else {
        res.status(200).json(cosmetic);
    }

})

app.post('/api/cosmetics');
app.put('/api/cosmetics/:id');
app.delete('/api/cosmetics/:id');

//Start the sever
app.listen(3000);