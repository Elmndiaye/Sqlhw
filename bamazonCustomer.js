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

function howMany(selection){
 connection.query("SELECT * FROM products WHERE product_name=?", selection, function(err, res) {
   if (err) throw err;
   console.log("The price is $" + res[0].price + " per unit. \nWe have " + res[0].qty + " units available.");
   inquirer.prompt({
       name: "numberSought",
       type: "choices",
       message: "How many would you like to buy?",
       choices: ["0","1","2","3","4","5","6","7","8","9","10"]
   }).then(function(answer){
     if (parseFloat(answer.numberSought) <= parseFloat(res[0].qty)){
       var totalPrice = parseFloat(answer.numberSought) * parseFloat(res[0].price);
       var stockLeft = parseFloat(res[0].qty) - parseFloat(answer.numberSought);
       console.log("The total price will be: $"+totalPrice);
       console.log("After purchase, we will have "+stockLeft+ " units left.");
       console.log("GET THEM WHILE YOU CAN! ATTENTION SHOPPERS!");
       purchaseQty(selection, stockLeft);
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







// var mysql = require("mysql");
// var inquirer = require("inquirer");

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "test",
//   database: "bamazon"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     runSearch();
//   });
  
//   function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "View or add?",
//         choices: [
//           "View Products for Sale",
//           "View Low Inventory",
//           "Add to Inventory",
//           "Add New Product",
          
//         ]
//     })
//     .then(function(answer) {
    
//       switch (answer.action) {
//       case "View Products for Sale":
//         productSearch();
//         break;

//     //   case "View Low Inventory":
//     //     multiSearch();
//     //     break;

//     //   case "Add to Inventory":
//     //     rangeSearch();
//     //     break;

//     //   case "Add New Product":
//     //     songSearch();
//     //     break;
      
//       }
//     });
// }
// function productSearch(){
//  connection.query("SELECT * FROM products", function(err,res){
//   for (var i = 0; i < res.length; i++){
//      console.log("product id: " + res[i].id + " " + res[i].product_name);
//      console.log("price: " + res[i].price);
//      console.log("stock_quantity: " + res[i].stock_quantity);
     

//   }
//  })   
// }

// // function multiSearch() {
// //     var query = "SELECT * FROM products WHERE stock_quantity <5 ";
// //     connection.query(query, function(err, res) {
// //       for (var i = 0; i < res.length; i++) {
// //         console.log(res[i].product_name);
// //             runSearch();
// //         };
// //     })
// // } 

// function product_nameSearch() {
//     inquirer
//       .prompt({
//         name: "product_name",
//         type: "input",
//         message: "What product_name would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM bamazon WHERE ?", { product_name: answer.product_name }, function(err, res) {
//           console.log(
//             "item_id: " +
//               res[0].item_id +
//               " || product_name: " +
//               res[0].product_name +
//               " || department_name: " +
//               res[0].department_name +
//               " || stock_quantity:" +
//                 res[0].stock_quantity +
//               " || price: " +
//               res[0].price
//           );
//           runSearch();
//         });
//       });
//   }
//   function inquirer() {
//     inquirer
//       .prompt({
//         name: "products",
//         type: "input",
//         message: "What product would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT item_id, product_name, department_name, price, stock_quantity WHERE ?";
//         connection.query(query, { product_name: answer.product_name }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("item_id: " + res[i].item_id + "||product_name:" + product_name + "||department_name" + res[i].department_name + " ||price: " + res[i].price + "||stock_quantity" + res[i].stock_quantity);
//           }
//           runSearch();
//         });
//       });
//   }
  
// //function query()
//   //connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES ("DR008", "Robe", "Fashion", "1200", "7" );", { product_name: answer.song }, function(err, res) {

//     function buy() {
//       inquirer
//         .prompt([
//           {
//             name: "product_name",
//             type: "input",
//             message: "Enter product name: ",
//           },
//           {
//             name: "quantity",
//             type: "input",
//             message: "quantity: ",
//             validate: function(value) {
//               if (isNaN(value) === false) {
//                 return true;
//               }
//               return false;
//             }
//           }
//         ])
        
//         .then(function(answer) {
//           var query = "UPDATE product SET ? WHERE ?"
//           [
//             {
//               stock_quantity: answer.currentStock - buy.stock

//             },
        
//             {
//               id: chosenProduct.id
//             }
//           ],


//            //FROM bamazon WHERE product BETWEEN ? AND ?";
//           connection.query(query, [answer.start, answer.end], function(err, res) {
     
//               res[0].price
//                ) }
//             });
//           });
//         }

            
