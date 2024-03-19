import express from "express";
import main from "./chat.mjs";
const app = express();
const port = process.env.PORT || 3001;

app.get("/api", main);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
