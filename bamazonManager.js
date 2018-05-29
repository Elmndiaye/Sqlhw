var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "tamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "View or add?",
        choices: [`
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Salet":
          productSearch();
          break;
  
  
