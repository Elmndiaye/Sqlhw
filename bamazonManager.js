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
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          
        ]
    })
    .then(function(answer) {
    
      switch (answer.action) {
      case "View Products for Sale":
        productSearch();
        break;
      case "View Low Inventory":
        multiSearch();
        break;
      case "Add to Inventory":
        rangeSearch();
        break;
      case "Add New Product":
        productSearch();
        break;
      
      }
    });
}
function productSearch(){
 connection.query("SELECT * FROM products", function(err,res){
  for (var i = 0; i < res.length; i++){
     console.log("product id: " + res[i].id + " " + res[i].product_name);
     console.log("price: " + res[i].price);
     console.log("quantity: " + res[i].stock_quantity);
  }
 })   
}
function multiSearch() {
    var query = "SELECT * FROM products WHERE stock_quantity <5 ";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].product_name);
            runSearch();
        };
    })
} 
function product_nameSearch() {
    inquirer
      .prompt({
        name: "product_name",
        type: "input",
        message: "What product_name would you like to look for?"
      })
      .then(function(answer) {
        console.log(answer.song);
        connection.query("SELECT * FROM bamazon WHERE ?", { product_name: answer.product_name }, function(err, res) {
          console.log(
            "item_id: " +
              res[0].item_id +
              " || product_name: " +
              res[0].product_name +
              " || department_name: " +
              res[0].department_name +
              " || stock_quantity:" +
                res[0].stock_quantity +
              " || price: " +
              res[0].price
          );
          runSearch();
        });
      });
  }
  function inquirer() {
    inquirer
      .prompt({
        name: "products",
        type: "input",
        message: "What product would you like to search for?"
      })
      .then(function(answer) {
        var query = "SELECT item_id, product_name, department_name, price, stock_quantity WHERE ?";
        connection.query(query, { product_name: answer.product_name }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("item_id: " + res[i].item_id + "||product_name:" + product_name + "||department_name" + res[i].department_name + " ||price: " + res[i].price + "||stock_quantity" + res[i].stock_quantity);
          }
          runSearch();
        });
      });
  }
  
    function rangeSearch() {
      inquirer
        .prompt([
          
          {
            name: "quantityUpdate",
            type: "input",
            message: "NEW PRODUCT QUANTITY: ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }
        ])
        .then(function(answer) {

            // logic from inquirer answer and update quantity in your database


            connection.query(
              "UPDATE products SET `stock_quantity` = `stock_quantity` -" + [answer.order_quantity] + ", `product_sales` = `product_sales` +" + [answer.order_quantity] + " WHERE `product_name` =?", [answer.product_name],
              function (err, res) {
                if (err) {
                  console.log(err);
                }
                // console.log(res);
              }
            ); 


          var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM bamazon WHERE product BETWEEN ? AND ?";
          connection.query(query, [answer.start, answer.end], function(err, res) {
            for (var i = 0; i < res.length; i++) {
              console.log(
                "item_id: " +
              res[0].item_id +
              " || product_name: " +
              res[0].product_name +
              " || department_name: " +
              res[0].department_name +
              " || stock_quantity:" +
                res[0].stock_quantity +
              " || price: " +
              res[0].price
               ) }
            });
          });
        }





