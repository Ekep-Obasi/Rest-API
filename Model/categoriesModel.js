const { writeFileSync, readFileSync } = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../database/category.json");

function getCategory() {
  try {
    const data = readFileSync(DB_FILE) || "[]";
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveCategory(data = []) {
  try {
    writeFileSync(DB_FILE, JSON.stringify(data, null, 4));
  } catch (e) {
    throw new Error("Database Write error");
  }
}

module.exports = { getCategory, saveCategory };
