const express = require('express');

//In-memory DB
const cosmeticIdIndex = 1;
const cosmetics = [{
    id: 0,
    name: 'Lipstick',
    color: 'Red'

}];

//Create the router object
const router = express.Router();

//Define endpoints
router.get('/api/cosmetics', (req, res, next) => {
    res.json(cosmetics);
})

router.get('/api/cosmetics/:id', (req, res, next) => {
    const { id } = req.params;
    const cosmetic = cosmetics.find(cosmetic => cosmetic.id == id);
    if(!cosmetic){
        res.status(404).json('Cosmetic with id ${id} was not found!');
    } else {
        res.status(200).json(cosmetic);
    }

})

router.post('/api/cosmetics');
router.put('/api/cosmetics/:id');
router.delete('/api/cosmetics/:id');

//Export the router object
module.exports = router;