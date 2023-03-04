const { User, Category, Event } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            attributes:['id', 'name', 'type', 't1', 't2', 't3'],
        });
        // res.render('homepage', categoryData);
        // const catList = await categoryData.json;
        const catList = categoryData.map((catList) => catList.get({ plain: true }));
        console.log(catList);
        res.json(catList);
    } catch (err) {
        res.status(500)
    }
});

// Route for login.
router.get('/:id', async (req,res) => {
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