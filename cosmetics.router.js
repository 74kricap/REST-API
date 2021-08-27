const express = require('express');
const {
    getCosmetics, 
    getOneCosmetic,
    postAndSaveCosmetic,
    updateCosmetic,
    deleteCosmetic} 
    = require('./cosmetics.controllers');
const { saveValidation } = require('./cosmetics.validation');

//Create the router object
const router = express.Router();

//Define endpoints
router.get('/api/cosmetics', getCosmetics);
router.get('/api/cosmetics/:id', getOneCosmetic);
router.post('/api/cosmetics', saveValidation, postAndSaveCosmetic);
router.put('/api/cosmetics/:id', updateCosmetic);
router.delete('/api/cosmetics/:id', deleteCosmetic);

//Export the router object
module.exports = router;