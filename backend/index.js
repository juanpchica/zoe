const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(express.static("public"));

app.get("/", (_, res) => res.send("Hello world!!"));

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
});
