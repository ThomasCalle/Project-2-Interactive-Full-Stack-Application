const { User, Category, Event, Settings } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();


router.post('/', async (req, res) => {
        User.create(req.body)
    .then((newUser) => {
        res.status(200).res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', async (req, res) => {
    User.update(
        {

        }
    )
})

router.delete('/:id', async (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    });
});

module.exports = router;