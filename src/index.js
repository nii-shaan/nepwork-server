import dotenv from "dotenv/config";
import { app } from "./app.js";

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.get("/", (req, res) => {
  res.json("This is nepwork server");
});
