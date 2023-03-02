const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes:['id', 'name', 'description', 'due_date'],
            // where: {
            //     id: user_id
            // },
            include: [{
                model: Category,
                attributes: ['name', 'type', 'T1', 'T2', 'T3']
            }]
        });
        res.render('homepage', eventData);
    } catch (err) {
        res.render('login');
    }
});

// Route for login.
router.get('/:id', async (req,res) => {
    try {
        const loginData = await User.findByPk( {
            attributes: ['id', 'username', 'password']
        })
        res.render('login', loginData)
    } catch (err) {
        res.render('login');
    }
})
