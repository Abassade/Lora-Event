require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');
const routes = require('./routes/ticket');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', pug);

routes(app);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
