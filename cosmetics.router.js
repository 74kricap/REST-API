const express = require('express');
const {
    getCosmetics, 
    getOneCosmetic,
    saveCosmetic} 
    = require('./cosmetics.controllers');
const { saveValidation } = require('./cosmetics.validation');

//Create the router object
const router = express.Router();



//Define endpoints
router.get('/api/cosmetics', getCosmetics);
router.get('/api/cosmetics/:id', getOneCosmetic);
router.post('/api/cosmetics', saveValidation, saveCosmetic);
router.put('/api/cosmetics/:id');
router.delete('/api/cosmetics/:id');

//Export the router object
module.exports = router;