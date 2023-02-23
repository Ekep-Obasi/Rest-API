const drinksdb = require("./drinksdb");
const { writeJson, readRequestData, getIdFromUrl } = require("./utils");

function getAllDrinks(req, res) {
  const drinks = drinksdb.getDrinks();
  writeJson(res, drinks);
}

function getOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const drinks = drinksdb.getDrinks();
  const drink = drinks.find((el) => el.id === id);
  if (drink) {
    writeJson(res, drink);
  } else {
    writeJson(res, { status: "NOT_FOUND" }, 404);
  }
}

async function updateOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const data = await readRequestData(req);
  if (!data) {
    return writeJson(res, { error: "Drink data missing" }, 403);
  }
  const drinks = drinksdb.getDrinks();
  const index = drinks.findIndex((user) => user.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...data });
    drinksdb.saveDrinks(drinks);
    writeJson(res, drinks[index]);
  } else {
    writeJson(res, { status: "NOT_FOUND" }, 404);
  }
}

function deleteOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const drinks = drinksdb.getDrinks();
  const index = drinks.findIndex((user) => user.id === id);
  if (index > -1) {
    drinks.splice(index, 1);
    drinksdb.saveDrinks(drinks);
  }
  writeJson(res, { status: "success" });
}

async function patchOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const data = await readRequestData(req);
  if (!data) {
    return writeJson(res, { error: "Request data missing" }, 403);
  }
  const drinks = drinksdb.getDrinks();
  const index = drinks.findIndex((item) => item.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...drinks[index], ...data, id });
    drinksdb.saveDrinks(drinks);
    writeJson(res, drinks[index]);
  } else {
    writeJson(res, { status: "NOT_FOUND" }, 404);
  }
}

async function createDrink(req, res) {
  const data = await readRequestData(req);
  if (!data) {
    return writeJson(res, { error: "User data missing" }, 403);
  }
  const newDrink = { ...data, id: Date.now() };
  const drinks = drinksdb.getDrinks();
  drinksdb.saveDrinks([...drinks, newDrink]);
  writeJson(res, newDrink);
}

module.exports = {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  deleteOneDrink,
  patchOneDrink,
};
