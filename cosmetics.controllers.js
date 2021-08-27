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
 * Responds with the requested cosmetic or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getOneCosmetic = (req, res, next) => {
    const { id } = req.params;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json('No cosmetics found!');
        }
        const newCosmetic = JSON.parse(data);
        const cosmetic = newCosmetic.find(cosmetic => cosmetic.id == id);
        if (!cosmetic) {
            res.status(404).json(`Cosmetic with id ${id} was not found!`);
        }
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
 * Updates the selected cosmetic
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const updateCosmetic = (req, res, next) => {
    const { id } = req.params;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json('No cosmetics found!');
        }
        const newCosmetic = JSON.parse(data);
        const cosmetic = newCosmetic.find(cosmetic => cosmetic.id == id);
        if (!cosmetic) {
            res.status(404).json(`Cosmetic with id ${id} was not found!`);
        } else {
            cosmetic.brand = req.body.brand;
            cosmetic.name = req.body.name;
            cosmetic.color = req.body.color;
            cosmetic.price = req.body.price;

        }
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
