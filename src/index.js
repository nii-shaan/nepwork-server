import dotenv from "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./db/connect.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error on express >> \n${error}`);
    });
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT} `);
    });
  })
  .catch((error) => {
    console.log(`failed to run server! ERROR> ${error}`);
  });

app.get("/", (req, res) => {
  res.json("This is nepwork server");
});

