const { User, Category, Event, Settings } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();

// register new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    // adds id and username to the session so that they can be displayed
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId  = dbUserData.get({plain:true}).id;
      req.session.firstName  = dbUserData.get({plain:true}).first_name;
      res.status(200).end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  User.update(
    {

    }
  )
})

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // adds id and first name to the session so that they can be displayed
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.get({ plain: true }).id;
      req.session.firstName = dbUserData.get({ plain: true }).first_name;
      res
        .status(200)
        .end();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
     res.status(204).end();
 })
});


router.delete('/:id', async (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  });
});

module.exports = router;