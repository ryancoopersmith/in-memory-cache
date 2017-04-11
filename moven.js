// Check README before running
let prompt = require('prompt');

let getInput = () => {
  let properties = [
    {
      name: 'command',
      required: true
    }
  ];

  let input;
  prompt.get(properties, (err, result) => {
    if (err) { return onErr(err); }
    input = result.command
    let variables = [];
    if (input !== 'END') {
      let setVar = input.slice(4)
      if (input.slice(0, 3) === 'SET') {
        let setVarArray = setVar.split('');
        setVarArray.forEach((char, index) => {
          if (parseInt(char)) {
            let variable = setVar.slice(0, index - 1);
            let value = parseInt(setVar.slice(index));
            variables.push([variable, value]);
          } else {
            console.log('You must set the variable to an integer value');
          }
        })
      } else if (input.slice(0, 5) === 'UNSET') {
        variables.forEach((variable, index) => {
          if (variable === setVar) {
            variables.splice(index, 1);
          } else {
            console.log('Your variable cannot be found');
          }
        })
      }
      getInput();
    } else {
      console.log('Goodbye!');
    }
  });

  let onErr = (err) => {
    console.log(err);
    return 1;
  }
}

getInput();
