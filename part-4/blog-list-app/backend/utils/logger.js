// ...params uses the Rest/Spread operator:
// Rest is used to gather an indefinite number of arguments into an array, which is then passed into the function.
// Spread is then used to 'spread' those array arguments out, individually, to the console when logging.
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.log(...params);
};

module.exports = { info, error };
