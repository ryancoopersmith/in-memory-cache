module.exports = (input, cache) => {
  let setVar = parseInt(input.slice(11));
  let counter = 0;

  if (!cache.transactions[0] && !cache.variables[0]) {
    console.log('You must set a variable first');
  }

  if (cache.transactions[0]) {
    cache.transactions.forEach((transaction, index) => {
      transaction.forEach((variable, varIndex) => {
        if (variable[1] === setVar) {
          counter ++;
        }
      });
    });
  } else if (cache.variables[0]) {
    cache.variables.forEach((variable, index) => {
      if (variable[1] === setVar) {
        counter ++;
      }
    });
  }

  console.log(counter);
}
