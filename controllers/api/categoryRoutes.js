const { User, Category, Event } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();


router.post('/', async (req, res) => {
    try {
        console.log(req.body.name);
        const categoryData = await Category.create({
          name: req.body.name,
          type: req.body.type,
          t1: req.body.t1,
          t2: req.body.t2,
          t3: req.body.t3
        });
        res.send(categoryData)
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });

module.exports = router;
