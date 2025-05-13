CREATE DATABASE pernshoppinglist;

CREATE TABLE shoppinglist(
    entry_id SERIAL PRIMARY KEY, 
    entry_name VARCHAR(255),
    quantity INTEGER
);