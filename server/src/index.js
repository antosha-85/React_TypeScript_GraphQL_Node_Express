const express = require("express");
const app = express();
const port = 9000;

const one = 1;
let two = 2;
two = 'two'
app.get('/', (req, res) => {
    res.send(`1 + 2 = ${one + two}`)
})

app.listen(port, function () {
    console.log('listening on port ')
})

console.log(`[app]: htpp://localhost:${port}`)

