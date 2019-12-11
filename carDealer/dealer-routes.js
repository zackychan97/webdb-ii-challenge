const express = require('express');
const knex = require('../data/db-config.js');

const router = express.Router();

function validateCarId(req, res, next) {
    knex.select("*")
        .from("cars")
        .where({ id: req.params.id })
        .first()
        .then(car => {
            if (car) {
                req.car = car;
                next();
            } else {
                res.status(404).json({ message: "Id desired doesnt exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "cant get the desired id" })
        })
    }

    function validateAddCarr (req, res, next){
        if (Object.keys(req.body).length === 0){
            res.status(400).json({ error: "no info given to us" })
        } else {
            if (!req.body.vin) {
                res.status(400).json({ error: "Please supply a vin for the vehicle." });
            } else if (!req.body.car_make){
                res.status(400).json({ error: "Please supply a car make for the vehicle." });
            } else if (!req.body.car_model){
                res.status(400).json({ error: "Please supply a car model for the vehicle." });
            } else if (!req.body.mileage){
                res.status(400).json({ error: "Please give us mileage for vehicle" })
            } else {
                req.carData = req.body;
                next();
            }
        }
    }

    router.get('/', (req, res) => {
        knex.select("*")
            .from('cars')
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "unable to get a list of the cars" })
            })
    })

    router.get('/:id', validateCarId, (req, res) => {
        res.send(req.car);
    })

    router.post('/', validateAddCarr, (req, res) => {
        const carData = req.carData;

        knex('cars')
            .insert(carData, 'id')
            .then(ids => {
                const id = ids[0];

                return knex('cars')
                    .select('*')
                    .where({ id })
                    .first()
                    .then(response => {
                        res.status(201).json(response);
                    })
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "Cant add new vehicle" })
            })
    })

    module.exports = router;