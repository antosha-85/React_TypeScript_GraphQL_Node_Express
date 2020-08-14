import express from "express";
import { listings } from "./listings";
import bodyParser from "body-parser";
const app = express();
const port = 9000;

app.use(bodyParser.json());

const one: number = 1;
const two: number = 2;

app.get("/", (_req, res) => res.send(`1 + 2 = ${one + two}`));

//listing
app.get("/listings", (_req, res) => {
  return res.send(listings);
});
//delete-listing
app.post("/delete-listing", (req, res) => {
  const id: string = req.body.id;
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }
  return res.send('Failed to delete!')
});
console.log(`[app]: htpp://localhost:${port}`);

app.listen(port, () => {
  // console.log(`Hey people! My app is listening on port ${port}!`);
});
