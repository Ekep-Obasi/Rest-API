const { getCategory, saveCategory } = require("../Model/categoriesModel");

function getAllCategories(_, res) {
  const categories = getCategory();
  res.json(categories);
}

function getOneCategory(req, res) {
  const id = +req.params.id;
  const categories = getCategory();
  const category = categories.find(({ categoryId }) => categoryId === id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

async function updateOneCategory(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return res.status(403).json({ error: "Drink data missing" });
  }
  const categories = getCategory();
  const index = categories.findIndex(({ categoryId }) => categoryId === id);
  if (index > -1) {
    categories.splice(index, 1, { ...data });
    saveCategory(categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function deleteOneCategory(req, res) {
  const id = +req.params.id;
  const categories = getCategory();
  const index = categories.findIndex(({ categoryId }) => categoryId === id);
  if (index > -1) {
    categories.splice(index, 1);
    saveCategory(categories);
  }
  res.json({ status: "success" });
}

async function patchOneCategory(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return res.send(403).json({ error: "Request data missing" });
  }
  const categories = getCategory();
  const index = categories.findIndex(({ categoryId }) => categoryId === id);
  if (index > -1) {
    categories.splice(index, 1, { ...categories[index], ...data, id });
    saveCategory(categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

async function createCategory(req, res) {
  const data = req.body;
  const categoryId = [...getCategory()].length;
  if (!data) {
    return res.send(403).json({ error: "User data missing" });
  }
  const newDrink = { ...data, categoryId: categoryId + 1 };
  const categories = getCategory();
  saveCategory([...categories, newDrink]);
  res.json(newDrink);
}

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
  patchOneCategory,
};
