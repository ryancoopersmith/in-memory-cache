module.exports = (input, cache) => {
  let setVar = input.slice(4);
  let setVarArray = setVar.split('');
  let counter = 0;

  setVarArray.every((char, index) => {
    if (parseInt(char)) {
      let variable = setVar.slice(0, index - 1);
      let value = parseInt(setVar.slice(index));
      if (cache.transactions[0]) {
        cache.transactions[cache.transactions.length - 1].push([variable, value]);
        return false;
      } else {
        cache.variables.push([variable, value]);
        return false;
      }
      counter ++;
    }

    if (index - counter === setVarArray.length - 1) {
      console.log('You must set the variable to an integer value');
    }
    return true
  });
};
