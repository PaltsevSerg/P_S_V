const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");

mongoose
    .connect('mongodb://localhost:27017/db', { useNewUrlParser: true })
    .then(() => {
        const app = express();
        const PORT = process.env.PORT || 80;

        app.use(express.json());
        app.use('', routes);

        app.listen(PORT, () => {
            console.log('Server has been started...');
        })
    })
