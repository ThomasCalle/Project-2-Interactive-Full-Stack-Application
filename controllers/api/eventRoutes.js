const { User, Category, Event } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();

// Assume session includes all User ID and relevant settings info.

// primary route
// get Event Data, find all by session user ID foreign key
//  - associate category table with each event
//  - use helper to calculate T1, T2, T3 in to API

router.post('/', async (req, res) => {
    try {
        console.log(req.body.id);
        const eventData = await Event.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            location: "",
            category_id: req.body.category_id,
            // "user_id": req.session.id
        });
        res.send(eventData)
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });

module.exports = router;

