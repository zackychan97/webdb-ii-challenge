const express = require('express');
const helmet = require('helmet');

const whipRouter = require("../carDealer/dealer-routes.js");

const server = express()

server.use(express.json());
server.use(helmet());

server.use('/api/cars/', whipRouter);

server.get('/', (req, res) => {
    res.send("<h1>Server Running...</h3>");
});

module.exports = server;