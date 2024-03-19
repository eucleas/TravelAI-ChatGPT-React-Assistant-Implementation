import express from "express";
import chat1 from "./chat1.mjs";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json()); // for parsing application/json

app.post("/chat1", chat1); // Use POST to allow sending data

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
