const { Request, Response, NextFunction } = require('express');
const { saveValidation } = require('./cosmetics.validation');

//In-memory DB
let cosmeticIdIndex = 3;
const cosmetics = [{
    id: 1,
    name: 'Lipstick',
    color: 'Red',
    price: '199kr'
},
{
    id: 2,
    name: 'Foundation',
    color: 'Fairly Light',
    price: '399kr'
}];

/**
 * Responds with all cosmetics from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getCosmetics = (req, res, next) => {
    res.json(cosmetics);
}

/**
 * Save a new cosmetic to the DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const saveCosmetic = (req, res, next) => {
    const cosmetic = { id: cosmeticIdIndex++, ...req.body };
    cosmetics.push(cosmetic);
    res.json(cosmetic);
}

/**
 * Responds with the requested cosmetic or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getOneCosmetic = (req, res, next) => {
    const { id } = req.params;
    const cosmetic = cosmetics.find(cosmetic => cosmetic.id == id);
    if (!cosmetic) {
        res.status(404).json('Cosmetic with id ${id} was not found!');
    } else {
        res.status(200).json(cosmetic);
    }

}

/**
 * Updates the selected cosmetic
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const updateCosmetic = (req, res, next) => {
    const { id } = req.params;
    const { name, color, price } = req.body;
    const index = cosmetics.findIndex(cosmetic => cosmetic.id == id);
    if(index >= 1){
        let cosmetic = cosmetics[index];
        cosmetic.name = name;
        cosmetic.color = color;
        cosmetic.price = price;
        res.json(cosmetics);
        return

    } 
    res.status(404).json('Cosmetic with id ${id} was not found!');
    
   
}


module.exports = {
    getCosmetics,
    getOneCosmetic,
    saveCosmetic,
    updateCosmetic
}