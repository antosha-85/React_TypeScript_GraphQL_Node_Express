// const express = require("express")
// type Listing = {}



import express from "express";
const app = express();
const port = 9000;

const one: number = 1;
const two: number = 2;

app.get("/", (_req, res) => res.send(`1 + 2 = ${one + two}`));

// app.listen(port, function () {
//     console.log('listening on port ')
// })

console.log(`[app]: htpp://localhost:${port}`);

app.listen(port, () => {
  console.log(`Hey people! My app is listening on port ${port}!`);
});
