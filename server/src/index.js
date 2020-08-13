const express = require("express");
const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send('Hello world, people!')
})

app.listen(port, (req, res) => {
    // console.log('listening on port ' + port)
})

console.log(`[app]: htpp://localhost:${port}`)