const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "./drinksdb.json");

function getDrinks() {
  try {
    const data = readFileSync(DB_FILE) || "[]";
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveDrinks(users = []) {
  try {
    const data = JSON.stringify(users, null, 4);
    writeFileSync(DB_FILE, data);
  } catch (e) {
    throw new Error("Database write error");
  }
}

module.exports =  { saveDrinks, getDrinks };
