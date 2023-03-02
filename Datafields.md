
### Data Types

### Event
- ID
- title
- Description
- category_id - FK
- Due Date
- Location?
- User_ID - FK

<!-- Defines the threshold of the event -->
### Category
- ID
- Name
- Type
- T1 - Threshold 1 range (# weeks, # months, # days, etc.)
- T2 - time until 2 range
- T3 - time until 3 range

### User
- ID
- Name (first and last)
- Username
- Password - encrypt
- Imported Calendars (array)

### Settings - Session
- user_id - FK
- view_type

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'category',
    //     key: 'id',
    //   },
    // },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
