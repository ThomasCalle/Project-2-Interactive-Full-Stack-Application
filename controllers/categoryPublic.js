const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            attributes:['id', 'name', 'type', 't1', 't2', 't3'],
            where: {
                user_id: req.session.userId
            }
        });
        const catData = categoryData.map((catData) => catData.get({ plain: true }));
        res.json(catData);
    } catch (err) {
        res.status(500)
    }
});

// Route for login.
router.get('/:id', withAuth, async (req,res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            attributes: ['id', 'name', 'type', 't1', 't2', 't3']
        });

        res.status(200).json(categoryData);
        // res.render('login', categoryData);

    } catch (err) {
        res.render('login');
    }
})

module.exports = router;