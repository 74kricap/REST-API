const uuid = require('uuid');
const { Request, Response, NextFunction } = require('express');
const { saveValidation } = require('./cosmetics.validation');
const { cosmetics } = require('./data/cosmetics.db.json');
const fs = require('fs');
const dataPath = './data/cosmetics.db.json';

/**
 * Responds with all cosmetics from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getCosmetics = (req, res, next) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json('No cosmetics found!');
        }
        res.send(JSON.parse(data));
    });
}

/**
 * Save a new cosmetic to the DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const postAndSaveCosmetic = (req, res, next) => {
    const cosmetic = { id: uuid.v1(), ...req.body };
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json('Someting went wrong!');
            return;
        }
        const newCosmetic = JSON.parse(data);
        newCosmetic.push(cosmetic);

        fs.writeFile(dataPath, JSON.stringify(newCosmetic, null, 2), (err) => {
            if (err) {
                res.status(500).json('Someting went wrong!');
                return
            }
            res.status(200).json(cosmetic);
        });

    });
}


/**
 * Responds with the requested cosmetic or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getOneCosmetic = (req, res, next) => {
    const { id } = req.params;
    // readfile
    // ny array rad 41-46
    //cosnetics.find = newCosmetic.find
    const cosmetic = cosmetics.find(cosmetic => cosmetic.id == id);
    if (!cosmetic) {
        res.status(404).json(`Cosmetic with id ${id} was not found!`);
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
    const { brand, name, color, price } = req.body;
    const cosmetic = cosmetics.find(cosmetic => cosmetic.id == id);
    if (!cosmetic) {
        res.status(404).json(`Cosmetic with id ${id} was not found!`);
    } else {
        cosmetic.brand = brand;
        cosmetic.name = name;
        cosmetic.color = color;
        cosmetic.price = price;

        res.json(cosmetics);
    }
}

/**
 * Deletes the selected cosmetic
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const deleteCosmetic = (req, res, next) => {
    
    const { id } = req.params;
    const index = cosmetics.findIndex(cosmetic => cosmetic.id == id);
    if (!index) {
        res.status(404).json(`Cosmetic with id ${id} was not found!`);
    }
    cosmetics.splice(index, 1);
    res.json(cosmetics);
}

module.exports = {
    getCosmetics,
    getOneCosmetic,
    postAndSaveCosmetic,
    updateCosmetic,
    deleteCosmetic
}
