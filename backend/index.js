const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const data = require("./data/db.json");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.get("/agents/:income", (req, res) => {
  const { income } = req.params;
  const newAgents = data.filter(
    (agent) =>
      agent.income <= parseInt(income) + 10000 &&
      agent.income >= parseInt(income) - 10000
  );
  return res.status(200).json({ agents: newAgents });
});

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
});
