const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  patchOnUser,
  deleteOneUser,
} = require("./users");

const app = express();
app.use(express.json());

const API_KEYS = ["123", "456", "789"];

app.use(function (req, res, next) {
  const { apiKey } = req.query;
  const key = req.get("x-api-key");

  if (API_KEYS.includes(apiKey) || API_KEYS.includes(key)) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.get("/users", getAllUsers);
app.post("/users", createUser);
app.get("/users/:id", getOneUser);
app.put("/users/:id", updateOneUser);
app.patch("/users/:id", patchOnUser);
app.delete("/delete/:id", deleteOneUser);

app.listen(8080, function () {
  console.log("Listening on port 8080");
});
