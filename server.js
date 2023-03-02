
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const helpers = require('./utils/helpers'); 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const MyModel = require('../models/myModel');

// Won't have to bring models into server - but, you will have to bring them into the route
const app = express();
const PORT = process.env.PORT || 3002;

// Set up Handlebars.js engine with custom helpers

const hbs = exphbs.create({ helpers });

const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'accesscal_db'
  },
  console.log(`Connected to the accesscal database.`)

);


const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
