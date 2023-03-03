const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
    database: "accesscal",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
        console.log("Connected to the database!");
    // start the application
    start();
});
// function to start the application
function start() {
    
// ask the user for the database information
    inquirer
        .prompt([
    {
        type: 'input',
        name: 'note',
        message: 'Enter a note:'
    },
    {
        type: 'input',
        name: 'years',
        message: 'Enter number of years:'
    },
    {
        type: 'input',
        name: 'months',
        message: 'Enter number of months:'
    },
    {
        type: 'input',
        name: 'days',
        message: 'Enter number of days:'
    }
    ]).then(answers => {
    const { note, years, months, days } = answers;

    console.log(`Your note: ${note}`);
    console.log(`Duration: ${years} years, ${months} months, ${days} days`);
    });
}