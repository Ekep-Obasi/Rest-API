const express = require("express");
const API_KEYS = require("./apikeys/apikeys");
const userRouter = require("./routes/users");
const drinkRouter = require("./routes/drinks");
const categoryRouter = require("./routes/category");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/drinks", drinkRouter);
app.use("/categories", categoryRouter);

app.use(function (req, res, next) {
  const { apiKey } = req.query;
  const key = req.get("x-api-key");

  if (API_KEYS.includes(apiKey) || API_KEYS.includes(key)) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.listen(8080, function () {
  console.log("Listening on port 8080");
});
