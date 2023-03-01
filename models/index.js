const User = require('./User');
const Category = require('./Category');
const Event = require('./Event');

User.hasMany(Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Category.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
  });

User.hasMany(Event, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Event.belongsTo(User, {
   foreignKey: 'user_id'
  });
  
  
module.exports = { User, Category, Event };



