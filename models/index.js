const User = require('./User');
const Category = require('./Category');
const Event = require('./Event');

Event.hasMany(Category, {
  foreignKey: 'event_id',
  onDelete: 'CASCADE'
});

Category.belongsTo(Event, {
  foreignKey: 'event_id'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
  });

User.hasMany(Event, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
   
  
module.exports = { User, Category, Event };

