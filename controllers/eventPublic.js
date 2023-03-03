const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            attributes:['id', 'name', 'description', 'due_date'],
            include: [{
                model: Category,
                attributes: ['name', 'type', 't1', 't2', 't3']
            }]
        })
                res.status(200).json(eventData);         
    } catch (err) {
        res.render('login');
    }
});
router.get('/:id', async (req, res) => {
    try {    
        const eventData = await Event.findByPk(req.params.id, {
                attributes: ['id', 'name', 'description', 'due_date'],
                include: [{
                    model: Category,
                    attributes: ['name', 'type', 't1', 't2', 't3']
                }]
            });
            res.render('event-modal', eventData);
        } catch {
            res.render('login')
        }
    }
);

module.exports = router;