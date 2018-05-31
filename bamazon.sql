
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(50),
  price  INT(60),
  stock_quantity VARCHAR(50),
  product_sale VARCHAR(50),
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR001", "Phone", "Electronic", "1000", "32" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR002","Shirt", "Closhing", "20", "102");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR003", "Lotion", "Beauty", "25", "60" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR004", "Film", "Movies", "7", "210" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR005", "Avam", "Book", "29", "15" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR006", "Avatar", "art", "3000", "2" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR007", "Moquette", "Home", "210", "50" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR008", "Robe", "Fashion", "1200", "7" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR009", "Tool1", "Garden", "13", "150" );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("DR0010", "Birima", "Msic", "3000", "32" );

SELECT * FROM products;

USE bamazon;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  department_id VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs VARCHAR(50),

);