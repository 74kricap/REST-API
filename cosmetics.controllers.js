const {Request, Response, NextFunction} = require('express');

//In-memory DB
const cosmeticIdIndex = 1;
const cosmetics = [{
    id: 0,
    name: 'Lipstick',
    color: 'Red'

}];

/**
 * Responds with all cosmetics from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getCosmetics = (req, res, next) => {
    throw new Error('');
    res.json(cosmetics);
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
    if(!cosmetic){
        res.status(404).json('Cosmetic with id ${id} was not found!');
    } else {
        res.status(200).json(cosmetic);
    }

}

module.exports = {
    getCosmetics,
    getOneCosmetic
}