const express = require('express');
const {
    getCosmetics, 
    getOneCosmetic} 
    = require('./cosmetics.controllers');

//Create the router object
const router = express.Router();

//Define endpoints
router.get('/api/cosmetics', getCosmetics);
router.get('/api/cosmetics/:id', getOneCosmetic);
router.post('/api/cosmetics');
router.put('/api/cosmetics/:id');
router.delete('/api/cosmetics/:id');

//Export the router object
module.exports = router;