const { getDrinks, saveDrinks } = require("../Model/drinksModel");

function getAllDrinks(req, res) {
  const drinks = getDrinks();
  res.json(drinks);
}

function getOneDrink(req, res) {
  const id = +req.params.id;
  const drinks = getDrinks();
  const drink = drinks.find((el) => el.id === id);
  if (drink) {
    res.json(drink);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function updateOneDrink(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return res.status(403).json({ error: "Drink data missing" });
  }
  const drinks = getDrinks();
  const index = drinks.findIndex((user) => user.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...data });
    saveDrinks(drinks);
    res.json(drinks[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function deleteOneDrink(req, res) {
  const id = +req.params.id;
  const drinks = getDrinks();
  const index = drinks.findIndex((user) => user.id === id);
  if (index > -1) {
    drinks.splice(index, 1);
    saveDrinks(drinks);
  }
  res.json({ status: "success" });
}

function patchOneDrink(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return res.send(403).json({ error: "Request data missing" });
  }
  const drinks = getDrinks();
  const index = drinks.findIndex((item) => item.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...drinks[index], ...data, id });
    saveDrinks(drinks);
    res.json(drinks[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function createDrink(req, res) {
  const data = req.body;
  if (!data) {
    return res.send(403).json({ error: "User data missing" });
  }
  const newDrink = { ...data, id: Date.now() };
  const drinks = getDrinks();
  saveDrinks([...drinks, newDrink]);
  res.json(newDrink);
}

function getDrinkByCategory(req, res) {
  const category = req.params.category;
  const drinks = getDrinks();
  const drink = drinks.filter(({ categoryID }) => categoryID === category);
  if (drink) {
    res.json(drink);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

module.exports = {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  deleteOneDrink,
  patchOneDrink,
  getDrinkByCategory,
};
