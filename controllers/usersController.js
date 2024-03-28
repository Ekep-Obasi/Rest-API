const { getUsers, saveUsers } = require("../Model/userModel");

function getAllUsers(_, res) {
  const users = getUsers();
  res.json(users);
}

function getOneUser(req, res) {
  const id = +req.params.id;
  const users = getUsers();
  const user = users.find((u) => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function updateOneUser(req, res) {
  const id = +req.params.id;
  const { firstName, lastName, email } = req.url; // Uncommited change
  if (!email || !firstName || !lastName) {
    return res.status(403).json({ error: "User data missing" });
  }
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index > -1) {
    users.splice(index, 1, { email, firstName, lastName, id });
    saveUsers(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function deleteOneUser(req, res) {
  const id = +req.params.id;
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index > -1) {
    users.splice(index, 1);
    saveUsers(users);
  }
  res.json({ status: "success" });
}

function patchOnUser(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return res.status(404).json({ error: "User data missing" });
  }
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index > -1) {
    users.splice(index, 1, { ...users[index], ...data, id });
    saveUsers(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function createUser(req, res) {
  const data = req.body;
  if (!data) {
    return res.status(403).json({ error: "User data missing" });
  }
  const newUser = { ...data, id: Date.now() };
  const users = getUsers();
  saveUsers([...users, newUser]);
  res.json(newUser);
}

module.exports = {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  patchOnUser,
};
