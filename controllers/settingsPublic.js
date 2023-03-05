const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();
const {calculateThresholdsDates, calculateThresholdBarPlots} = require ('../utils/index');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const settingsData = await User.findByPk(req.session.userId, {
            attributes:['id', 'first_name', 'last_name', 'email'],
            include: [{
                model: Category,
                attributes: ['name', 'type', 'id']
            }],
            include: [{
                model: Event
            }]
        })
        const setData = settingsData.map((setData) => setData.get({ plain: true }));
        res.render('settings');
    } catch (err) {
        res.status(500)
    }
})

module.exports = router;