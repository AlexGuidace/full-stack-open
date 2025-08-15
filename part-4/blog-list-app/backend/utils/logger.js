// ...params uses the Rest/Spread operator:
// Rest is used to gather an indefinite number of arguments into an array, which is then passed into the function.
// Spread is then used to 'spread' those array arguments out, individually, to the console when logging.
const info = (...params) => {
  // Exclude info about requests during testing.
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  // Exclude info about requests during testing.
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

module.exports = { info, error };
