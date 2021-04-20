const express = require('express');

const app = express();

var path = require('path');

app.use(express.static('index'));
app.use(express.raw());

app.get('/', (req, res)=> {
    // res.sendFile(path.join(__dirname + '/index/index.html'));
    // res.sendFile(path.join(__dirname + '/index/webgl-demo.js'));
    // res.sendFile(path.join(__dirname + '/index/tetris-game.js'));
    //res.sendFile(path.join(__dirname + '/index/webgl.css'));
    res.send(1);
    console.log(req.header);
    console.log("lmap");
});

app.get('/noob', (req, res)=> {
    res.send([1,2,3,4,5]);

});

const port = process.env.PORT || 3000;


app.listen( port , () => {
    console.log("port3000");

})