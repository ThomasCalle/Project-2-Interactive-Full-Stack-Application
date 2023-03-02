const User = require('./User');
const Category = require('./Category');
const Event = require('./Event');

Event.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Category.hasMany(Event, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'user_id'
  // onDelete: 'CASCADE'
});

User.hasMany(Event, {
  foreignKey: 'user_id'
});
   
  
module.exports = { User, Category, Event };

