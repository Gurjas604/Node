const express = require('express');

const app = express();

var path = require('path');

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/index/index.html'));

});

app.get('/noob', (req, res)=> {
    res.send([1,2,3,4,5]);

});

const port = process.env.PORT || 3000;


app.listen( port , () => {
    console.log("port3000");

})