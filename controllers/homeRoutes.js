const { User, Category, Event, Settings } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();

// Assume session includes all User ID and relevant settings info.

// primary route
// get Event Data, find all by session user ID foreign key
//  - associate category table with each event
//  - use helper to calculate T1, T2, T3 in to API

router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            attributes:['id', 'name', 'description', 'due_date'],
            // where: {
            //     id: user_id
            // },
            include: [{
                model: Category,
                attributes: ['name', 'type', 'T1', 'T2', 'T3']
            }]
        });
        const events = eventData.map((event) => event.get({ plain: true }));
        res.render('homepage', { events });  
    } catch (err) {
        res.render('login');
    }
});

module.exports = router;

