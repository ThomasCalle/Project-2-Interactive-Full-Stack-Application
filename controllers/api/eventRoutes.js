const { User, Category, Event } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();

// Assume session includes all User ID and relevant settings info.

// primary route
// get Event Data, find all by session user ID foreign key
//  - associate category table with each event
//  - use helper to calculate T1, T2, T3 in to API

router.post('/', (req, res) => {
    Event.create(req.body)
        .then((newEvent) => {
            res.status(200).res.json(newEvent);
        })
        .catch((err) => {
            res.status(500).json(err + req.body);
        });
});

module.exports = router;

