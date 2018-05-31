var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
 host: "localhost",

 // Your port; if not 3306
 port: 3306,

 // Your username
 user: "root",

 // Your password
 password: "test",
 database: "bamazon"
});

var choices = [];
var choice = "0";
var capitalOnHand = 0.0;

connection.connect(function(err) {
 if (err) throw err;
 console.log("connected as id " + connection.threadId);
 afterConnection();
});

function afterConnection() {
 connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
   if (err) throw err;
   for (var i = 0; i < res.length; i++) {
           console.log("item_id: " + res[i].item_id + "|| product_name: " + res[i].product_name + " ||price: $" + res[i].price);
           choices.push(res[i].product_name);
         }

   console.log(choices);
   buyProduct();
 });
}

function buyProduct() {
 inquirer.prompt({
       name: "action",
       type: "rawlist",
       message: "Which product would you like to buy?",
       choices: choices,

   })
   .then(function(answer) {

     console.log("Ok, so you want to buy " + answer.action);
     choice = answer.action;
     console.log(choice);
     howMany(choice);
   });
}

function howMany(boughtItem){
 connection.query("SELECT * FROM products WHERE product_name=?", boughtItem, function(err, res) {
   if (err) throw err;
   console.log("The price is $" + res[0].price + " per unit. \nWe have " + res[0].qty + " units available.");
   inquirer.prompt({
       name: "numberSought",
       type: "input",
       message: "How many would you like to buy?",
   }).then(function(answer){
     if (parseFloat(answer.numberSought) <= parseFloat(res[0].qty)){
       var totalPrice = parseFloat(answer.numberSought) * parseFloat(res[0].price);
       var boughtAmount = parseFloat(res[0].qty) - parseFloat(answer.numberSought);
       console.log("The total price will be: $"+totalPrice);
       console.log("After purchase, we will have "+boughtAmount+ " units left.");
       console.log("GET THEM WHILE YOU CAN! ATTENTION SHOPPERS!");
       purchaseQty(boughtItem, boughtAmount);
       }
     else {
       console.log("You can see, above, that we do not have enough units in stock.");
       }
   });
 });
}

function purchaseQty(selection, stockLeft){

 connection.query("UPDATE products SET quantity = "+stockLeft+" WHERE product_name= '"+selection+"'" , function(err,res){
   if(err) throw err;
   console.log(selection);
 });
 connection.end();
}







