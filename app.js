var express = require('express');
var app = express()
app.listen(8080, () => {
    console.log(' running on port 8080');
});

app.get('/', (req, res) => {
    res.send('<h1>Hell, world!</h1>');
});