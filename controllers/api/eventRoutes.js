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
  res.status(500).json(err);
});
});


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
            res.status(200).json(eventData)
        } catch {
            res.status(404).json("Not found")
        }
    }
);


module.exports = router;

