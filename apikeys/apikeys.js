const API_KEYS = ["123", "456", "789"];
function generateApiKey(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let apiKey = "";
  let counter = 0;

  while (counter < length) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    counter++;
  }

  return apiKey;
}

console.log(generateApiKey(25));

module.exports = API_KEYS;
