const sequelize = require('../config/connection');
const { User, Category, Event } = require('../models');

const categoryData = require('./category.json');
const userData = require('./user.json');
const eventData = require('./event.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });
  await Event.bulkCreate(eventData, {
    individualHooks: true,
    returning: true,
  });


process.exit(0);
};

seedDatabase();
