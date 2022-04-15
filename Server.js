const express = require('express');
const app = express();
var cors = require('cors')

const PORT = process.env.PORT || 9000;


app.use(cors())
app.use(require('./Route.js'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
