const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const data = require("./data/db.json");

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(express.static("public"));

app.get("/agents/", (req, res) => {
  console.log("work");
  if (req.params.income) {
  } else {
    return res.status(200).json({ agents: data });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
});
