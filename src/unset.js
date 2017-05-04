module.exports = (input, cache) => {
  let setVar = input.slice(6);
  let found = false;

  if (!cache.transactions[0] && !cache.variables[0]) {
    console.log('You must set a variable first');
  }

  if (cache.transactions[0]) {
    cache.transactions.forEach((transaction, index) => {
      transaction.forEach((variable, varIndex) => {
        if (variable[0] === setVar) {
          cache.transactions[index].splice(varIndex, 1);
          found = true;
        }
      });
    });
  } else if (cache.variables[0]) {
    cache.variables.forEach((variable, index) => {
      if (variable[0] === setVar) {
        cache.variables.splice(index, 1);
        found = true;
      }
    });
  }

  if (!found) {
    console.log('Your variable cannot be found');
  }
}
