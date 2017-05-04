module.exports = (input, cache) => {
  let setVar = input.slice(4);
  let found = false;

  if (!cache.transactions[0] && !cache.variables[0]) {
    console.log('You must set a variable first');
  }

  if (cache.transactions[0]) {
    cache.transactions.forEach((transaction, index) => {
      transaction.forEach((variable, varIndex) => {
        if (variable[0] === setVar) {
          console.log(variable[1]);
          found = true;
        }
      });
    });
  } else if (cache.variables[0]) {
    cache.variables.forEach((variable, index) => {
      if (variable[0] === setVar) {
        console.log(variable[1]);
        found = true;
      }
    });
  }

  if (!found) {
    console.log('NULL');
  }
}
