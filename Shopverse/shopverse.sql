
DROP DATABASE IF EXISTS e_commerce;
CREATE SCHEMA e_commerce;
USE e_commerce;

CREATE TABLE e_commerce.customer (
    customer_id INT PRIMARY KEY,
    FirstName VARCHAR(50),
    MiddleName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    DateOfBirth DATE,
    phone BIGINT,  
    age INT NULL
);

-- CATEGORY TABLE
CREATE TABLE e_commerce.category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255),
    Description VARCHAR(255)
);

-- SELLER TABLE
CREATE TABLE e_commerce.seller (
    seller_id INT PRIMARY KEY,
    seller_name VARCHAR(255),
    seller_phone BIGINT,  
    total_sales FLOAT
);

-- ADDRESS TABLE
CREATE TABLE e_commerce.address (
    address_id INT PRIMARY KEY,
    apart_no INT,
    apart_name VARCHAR(255),
    streetname VARCHAR(255),
    state VARCHAR(255),
    city VARCHAR(255),
    pincode INT,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- PRODUCT TABLE
CREATE TABLE e_commerce.product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    MRP FLOAT,
    stock INT,  
    brand VARCHAR(255),
    category_id INT,
    seller_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL ON UPDATE NO ACTION,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id) ON DELETE SET NULL ON UPDATE NO ACTION
);

-- CART TABLE 
CREATE TABLE e_commerce.cart (
    cart_id INT PRIMARY KEY,
    grandtotal FLOAT,
    itemtotal INT,
    customer_id INT,
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE NO ACTION,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE SET NULL ON UPDATE NO ACTION
);

-- REVIEW TABLE
CREATE TABLE e_commerce.review (
    review_id INT PRIMARY KEY,
    description VARCHAR(255),
    rating ENUM('1','2','3','4','5'),
    customer_id INT,
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE NO ACTION,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE SET NULL ON UPDATE NO ACTION
);

-- ORDER TABLE (named order_table to avoid reserved keyword)
CREATE TABLE e_commerce.order_table (
    order_id INT PRIMARY KEY,
    order_date DATETIME,
    order_amount FLOAT,
    order_status ENUM('delivery','not delivery'),
    shipping_date DATETIME,
    customer_id INT,
    cart_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE NO ACTION,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE SET NULL ON UPDATE NO ACTION
);

-- ORDER ITEM TABLE 
CREATE TABLE e_commerce.orderitem (
    order_id INT,
    product_id INT,
    MRP FLOAT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES order_table(order_id) ON DELETE SET NULL ON UPDATE NO ACTION,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE SET NULL ON UPDATE NO ACTION
);

-- PAYMENT TABLE
CREATE TABLE e_commerce.payment (
    payment_id INT PRIMARY KEY AUTO_INCREMENT, 
    paymentMode ENUM('online','offline'),
    dateofpayment DATETIME,
    order_id INT,
    customer_id INT,
    FOREIGN KEY (order_id) REFERENCES order_table(order_id) ON DELETE SET NULL ON UPDATE NO ACTION,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE NO ACTION
);

-- =====================================================
-- Step 3: Insert Sample Data
-- =====================================================

-- CUSTOMER
INSERT INTO e_commerce.customer VALUES 
(1, 'Animesh', NULL, 'Sudhanshu', 'itsanimeshs@gmail.com', '2005-09-08', 9876543210, 0),
(2, 'Devansh', NULL, 'Rathaur', 'devansh@gmail.com', '2005-05-09', 9876543211, 0),
(3, 'Ashish', NULL, 'Bhagat', 'abhagat@gmail.com', '2006-06-02', 9876543212, 0);

-- CATEGORY
INSERT INTO e_commerce.category VALUES 
(1, 'Mobiles & Computer', 'all the brands are there like phone, tablets, PC, Desktop'),
(2, 'TV & Appliances & Electronics', 'all the brands are there like tv smart, tv oled, mixer and many more'),
(3, 'Men`s Fashion', 'all the brands are there like t-Shirts, jeans, shirts,etc'),
(4, 'Women`s Fashion', 'all the brands are there like shorts,one pic, kurti, t-shirt,jeans,etc');

-- SELLER
INSERT INTO e_commerce.seller VALUES 
(1, 'raghuram mahajan', 1295874636, 12000.75),
(2, 'nitish sharma', 7865423565, 38000.20),
(3, 'prakash singh', 7465456456, 8529.23);

-- ADDRESS
INSERT INTO e_commerce.address VALUES 
(1, 108, 'meow industries', 'dev nagar', 'punjab', 'patiala', 147004, 1),
(2, 214, 'laxmi enterprises', 'rawalpindi', 'punjab', 'patiala', 147004, 2),
(3, 52, 'oberoi traders', 'thakur pratap nagar', 'punjab', 'patiala', 147004, 3);

-- PRODUCT
INSERT INTO e_commerce.product VALUES
(1, 'pen drive', 250, 52, 'hp', 2, 1),
(2, 'monitor', 25000, 30, 'dell', 1, 3),
(3, 'keyboard', 765, 69, 'lenovo', 2, 2),
(4, 'i phone 15', 75000, 10, 'Apple', 1, 2),
(5, 'Mens t-shirts', 350, 22, 'H&M', 3, 1),
(6, 'mens kurta', 766, 32, 'ZARA', 3, 3),
(7, 'women shorts', 360, 52, 'pantaloom', 4, 2),
(8, 'women jeans', 699, 65, 'zudio', 4, 1),
(9, 'mouse', 299, 65, 'lenovo', 2, 3),
(10, 'desktop', 25000, 10, 'dell', 1, 2);

-- CART
INSERT INTO e_commerce.cart VALUES 
(1, 75000, 1, 1, 4),
(2, 1050, 3, 2, 5),
(3, 598, 2, 3, 9),
(4, 2160, 6, 2, 7),
(5, 250, 1, 1, 1),
(6, 3830, 6, 3, 6);

-- ORDER_TABLE
INSERT INTO e_commerce.order_table VALUES 
(1, '2026-05-06 10:12:20', 75000, 'delivery', '2026-05-07 09:25:02', 1, 1),
(2, '2026-05-06 20:23:20', 1050, 'delivery', '2026-05-09 05:29:02', 2, 2),
(3, '2026-05-08 18:12:20', 598, 'delivery', '2026-05-09 09:26:02', 3, 3),
(4, '2026-05-10 15:45:20', 2160, 'delivery', '2026-05-11 11:26:02', 2, 4),
(5, '2026-05-10 15:45:20', 250, 'delivery', '2026-05-13 11:26:02', 1, 5),
(6, '2026-05-21 16:23:20', 3830, 'delivery', '2026-05-22 11:35:09', 3, 6);

-- ORDERITEM
INSERT INTO e_commerce.orderitem VALUES 
(1, 4, 75000, 1),
(2, 5, 350, 3),
(3, 9, 299, 2),
(4, 7, 360, 6),
(5, 1, 250, 1),
(6, 6, 766, 5);

-- PAYMENT
INSERT INTO e_commerce.payment (paymentMode, dateofpayment, order_id, customer_id) VALUES 
('online', '2026-05-06 10:12:56', 1, 1),
('online', '2026-05-06 20:23:20', 2, 2),
('online', '2026-05-08 18:12:20', 3, 3),
('online', '2026-05-10 15:45:20', 4, 2),
('online', '2026-05-10 15:45:20', 5, 1),
('online', '2026-05-21 16:23:20', 6, 3);

-- REVIEW
INSERT INTO e_commerce.review VALUES 
(1, 'i phone 15 is amazing.', '5', 1, 4),
(2, 'wow t-shirts ,good in quality.', '3', 2, 5),
(3, 'best mouse in the world.', '4', 3, 9),
(4, 'very comfatabale in size and quality.', '4', 2, 7),
(5, 'the size is 128mb pendrive, speed is good.', '5', 1, 1),
(6, 'size of kurta and quality is good', '2', 3, 6);


-- Step 4: SELECT QUERIES TO VIEW RESULTS (Result Grids!) 

--  View All Customers
SELECT * FROM e_commerce.customer;

--  View All Products with Category & Seller
SELECT 
    p.product_id,
    p.product_name,
    p.MRP,
    p.stock,
    p.brand,
    c.category_name,
    s.seller_name
FROM e_commerce.product p
LEFT JOIN e_commerce.category c ON p.category_id = c.category_id
LEFT JOIN e_commerce.seller s ON p.seller_id = s.seller_id;

-- 🛒 View Cart with Customer & Product Details
SELECT 
    cart.cart_id,
    CONCAT(c.FirstName, ' ', c.LastName) AS customer_name,
    prod.product_name,
    prod.brand,
    cart.itemtotal AS quantity,
    cart.grandtotal AS total_price
FROM e_commerce.cart cart
JOIN e_commerce.customer c ON cart.customer_id = c.customer_id
JOIN e_commerce.product prod ON cart.product_id = prod.product_id;

--  View Orders with Customer & Cart Info
SELECT 
    o.order_id,
    o.order_date,
    CONCAT(cust.FirstName, ' ', cust.LastName) AS customer,
    o.order_amount,
    o.order_status,
    o.shipping_date
FROM e_commerce.order_table o
JOIN e_commerce.customer cust ON o.customer_id = cust.customer_id;

--  View Reviews with Product & Customer Names
SELECT 
    r.review_id,
    CONCAT(cust.FirstName, ' ', cust.LastName) AS reviewer,
    prod.product_name,
    r.rating,
    r.description
FROM e_commerce.review r
JOIN e_commerce.customer cust ON r.customer_id = cust.customer_id
JOIN e_commerce.product prod ON r.product_id = prod.product_id;

--  View Payments with Order & Customer Details
SELECT 
    p.payment_id,
    p.paymentMode,
    p.dateofpayment,
    CONCAT(cust.FirstName, ' ', cust.LastName) AS customer,
    o.order_id,
    o.order_amount
FROM e_commerce.payment p
JOIN e_commerce.customer cust ON p.customer_id = cust.customer_id
JOIN e_commerce.order_table o ON p.order_id = o.order_id;

--  Summary: Total Sales by Seller
SELECT 
    s.seller_name,
    COUNT(p.product_id) AS products_listed,
    SUM(p.stock) AS total_stock,
    s.total_sales AS reported_sales
FROM e_commerce.seller s
LEFT JOIN e_commerce.product p ON s.seller_id = p.seller_id
GROUP BY s.seller_id, s.seller_name;

