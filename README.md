# Project-02-Interactive-Full-Stack-Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
## Description:
Welcome to AccessCal our Interactive Full-Stack Application developed for those with Attention-Deficit/Hyperactivity Disorder(ADHD). The application provides a comprehensive suite of tools tailored to those with time-blindness to visualise their calendar and how each event tracks to the deadline. The user can create various event and associate various various thresholds (i.e. reminders) that will help them visualise the criticality of each event. 


The application is device-friedly allowing the user to intergrate a visual event tracker tailored their personal devices in order to meet the subjects needs. 

AccessCal offers a streamlined and intuitive user interface, allowing users to effectively manage their own visual event tracker. 

## Table of Contents:
- [The Challenge](#the-challenge)
- [Installation Process](#installation-process)
- [Usage Instructions](#usage-instructions)
- [Built With](#built-with)
- [Solution URL](#solution-url)
- [Walkthrough](#walkthrough-video)
- [Screenshots](#screenshots)
- [Continued Development](#continued-development)
- [Team Resources](#team-resources)
- [License](#license)
- [Authors](#authors)


## The Challenge:

As a user (with time blindness/ADHD)
I would like to see a visualization of my upcoming events
WHEN I log in to the page,
THEN I see my most pressing events graphically displayed, coloured based on the urgency of the event, and a list of my other, upcoming events
WHEN I create an event
THEN I am given the ability to set a category to define alert threshold periods
WHEN I click on the event
THEN I am given a calendar and the ability to add task events related to the event.

## Installation Process

PRE-Requisites: 
- you must have node.js version 16.* installed on your computer prior to proceeding
- you must have MySQL/MariaDB installed on your computer prior to proceeding


### Databse setup
This must be executed before launching the application
1. Log into your MySQL/MariaDB server.
2. Execute the following command:
```md
    mysql> source path_to_schema.sql/schema.sql
```
3. Verify the database creation by running the command. The database should be listed in the results
```md
    mysql> show databases;
```

### Application launch:
1. Download the source code
2. Navigate to the folder containing the package.json file
3. Run the following commands
```md
    $ npm install
    $ node ./seed/seeds.js
    $ npm start
```


## Usage Instructions
1. Open the application
2. Log in or create an account
3. Enter new events in your calendar
4. View events along the bar graphs
    1. click on the bar graph to show info about the event

The walkthrough video provides information on the application usage.
    

## Built With
### Dependencies:
1. D3: Data-Driven Documents: [7.8.2](https://www.npmjs.com/package/d3)
2. Node.bcrypt.js: [5.0.0](https://www.npmjs.com/package/bcrypt/v/5.0.0)
3. Connect Session Store using Sequelize: [7.1.5](https://www.npmjs.com/package/connect-session-sequelize)
4. Day.js: [1.11.7](https://www.npmjs.com/package/dayjs)
5. Dotenv: [8.6.0](https://www.npmjs.com/package/dotenv)
6. Express: [4.18.2](https://www.npmjs.com/package/express/v/4.18.2)
7. Express Handlebars: [5.3.5](https://www.npmjs.com/package/express-handlebars/v/5.3.5)
8. Express-session: [1.17.1](https://www.npmjs.com/package/express-session/v/1.17.1)
9. Handlebars.js: [4.7.6](https://www.npmjs.com/package/handlebars/v/4.7.6)
10. Node MySQL2: [2.3.3](https://www.npmjs.com/package/mysql2/v/2.3.3)
11. Sequelize: [6.3.5](https://www.npmjs.com/package/sequelize/v/6.3.5)

### Dev Dependencies:
1. ESlint: [7.12.1](https://www.npmjs.com/package/eslint/v/7.12.1)
2. eslint-config-prettier: [8.6.0](https://www.npmjs.com/package/eslint-config-prettier?activeTab=versions)
3. prettier: [2.8.4](https://www.npmjs.com/package/prettier?activeTab=versions)


## Solution URL:
Solution URL Link: http://access-cal.herokuapp.com/

## Walkthrough Video:
Video showing the app functionality is found here: 

## Screenshots:
### Figure 1. Landing Page
![ladnging Page](./assets/images/AC-01-landing.png)


### Figure 2. The calendar visual
![Calendar](./assets/images/AC-02-calendar.png)


### Figure 3. The event visual
![Event](./assets/images/AC-03-event.png)


## Continued Development:
1. Establishing a Profile and Settings page where the user can enter their preferences
2.  
3.  

## Team Resources: 
1. Google Doc: [Drive link.](https://docs.google.com/document/d/1v4as5Qv2Gpde1HeM4KnLYV29Weq0TUG6w2yb4b9bq-o/edit)
2. Heroku: [Application link](https://access-cal.herokuapp.com/)
3. GitHub: [Repo link](https://github.com/ThomasCalle/Project-2-Interactive-Full-Stack-Application)
4. Instapage: [Landing page link](https://instapage.com/landing-page-templates?utm_medium=cpc&utm_source=google&utm_term=landing%20page%20templates&device=c&network=g&matchtype=e&utm_campaign=NA-G-S%7CCat_01%7CLEADS%7CLanding-Page&utm_agn=lp_templates&gclid=Cj0KCQiA0oagBhDHARIsAI-Bbgd-jLU3gVmoizDNAXsOQKPiqTFXkb_nJFpIfwKjGLSmvuCVSGLAryQaAl9UEALw_wcB#js-template-120)
5. Tome.app: [Presentation Link](https://tome.app/thomascalle/interactive-full-stack-application-cleriaj8t04sc8n41jmrsos4x)



## License
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Open Source Initiative Link](https://opensource.org/licenses/MIT)

### Copyright © 2023
```md
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Authors
Follow our team on Github! Additional questions or concerns? Feel free to contact us!
- [ThomasCalle](https://github.com/ThomasCalle)
- [Stephen Cardie](https://github.com/omgthegreenranger)
- [Stefan Marinov](https://github.com/scorpionfiko)

See you soon!

© 2023 [ThomasCalle](https://github.com/ThomasCalle), [Stephen Cardie](https://github.com/omgthegreenranger), [Stefan Marinov](https://github.com/scorpionfiko). Confidential and Proprietary. All Rights Reserved.