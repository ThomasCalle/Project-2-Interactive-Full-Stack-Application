const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes:['id', 'name', 'description', 'due_date'],
            where: {
                id: req.session.userId
            },
            include: [{
                model: Category,
                attributes: ['name', 'type', 'T1', 'T2', 'T3']
            }]
        });
        res.render('homepage', userData);
    } catch (err) {
        res.render('login');
    }
});

// Route for login.
router.get('/:username', async (req,res) => {
    try {
        const loginData = await User.findOne(
            {where: { username: req.params.username },

            attributes: ['id', 'username', 'password']
        });

        res.status(200).json(loginData);
        // res.render('login', loginData);

    } catch (err) {
        res.render('login');
    }
})

module.exports = router;