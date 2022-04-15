const express = require('express');
const app = express();
var cors = require('cors')

const hostname = '127.0.0.1';
const port = 9000;

app.use(cors())
app.use(require('./Route.js'))

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
