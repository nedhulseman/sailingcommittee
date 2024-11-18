const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')

const app = express();

dotenv.config({ path: './.env' })


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

index.hbs


ALTER USER 'nhulseman'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dustPed15';
