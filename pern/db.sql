--for help  \?

--list db   \l

--create db  CREATE DATABASE db_name;

--list all table  \d

--delete table DROP TABLE table_name;

--delete database DROP DATABASE db_name;

CREATE TABLE products (
  id INT,
  name VARCHAR(60),
  price INT,
  on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants (
  id INT,
  name VARCHAR(50),
  location VARCHAR(50),
  price_range INT
);

INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'mcdonalds', 'new york', 3);

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 AND price_range <= 5)
);






CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

INSERT INTO reviews (restaurant_id,name,review, rating) values (90,'carl', 'restaurant was awesome', 5);

SELECT * FROM reviews WHERE restaurant_id = 9;

SELECT COUNT(*) FROM reviews WHERE restaurant_id=9;

SELECT TRUNC(AVG(rating),2) AS avg_rating FROM reviews WHERE restaurant_id=9;

SELECT location, COUNT(location) FROM restaurants GROUP BY location;

SELECT restaurant_id, COUNT(restaurant_id) FROM reviews GROUP BY restaurant_id;

-- JOINS
-- LEFT JOIN, RIGHT JOIN, etc.
SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;