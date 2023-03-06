
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const dayjs = require('dayjs');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')


const helpers = require('./utils/helpers'); 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const MyModel = require('../models/myModel');

// Won't have to bring models into server - but, you will have to bring them into the route
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers

const hbs = exphbs.create({ helpers });
app.use(cors())

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60*60*1000,
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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

app.post('/contact', (req, res) => {
  
});
// Get API KEY from SENDGRID
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.get('/send-email', (req, res) => {
  const email = req.query.email;
  const msg = {
    to: email,
    from: 'thomas.calle@outlook.com', // The verfied email for the sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
});

app.post('/send-email', (req, res) => {
  // Defined the email variable 
  const email = req.body.email;
  const name = req.body.name;
  const message = req.body.message;
  const msg = {
    to: email, // Change to recipient
    from: 'thomas.calle@outlook.com', // Change to verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      res.send('Email sent successfully');
    })
    .catch((error) => {
      console.error(error)
      res.send('Error sending email');
    })
});
