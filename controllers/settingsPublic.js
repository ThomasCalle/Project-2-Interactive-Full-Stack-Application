const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();
const {calculateThresholdsDates, calculateThresholdBarPlots} = require ('../utils/index');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('settings')
    } catch (err) {
        res.status(500)
    }
})

module.exports = router;