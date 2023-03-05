const { User, Category, Event } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();


router.post('/', (req, res) => {
    Category.create(req.body)
        .then((newCat) => {
            res.status(200).res.json(newCat);
        })
        .catch((err) => {
            res.status(500).json(err + req.body);
        });
});

module.exports = router;
