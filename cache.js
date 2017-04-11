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

    input = result.command;
    let variables = [];
    let transactions = [];

    if (input !== 'END') {
      let setVar = input.slice(4);

      if (input.slice(0, 3) === 'SET') {
        let setVarArray = setVar.split('');

        setVarArray.forEach((char, index) => {
          if (parseInt(char)) {
            let variable = setVar.slice(0, index - 1);
            let value = parseInt(setVar.slice(index));

            if (transactions[0]) {
              transactions[transactions.length - 1].push([variable, value]);
            } else {
              variables.push([variable, value]);
            }
          } else {
            console.log('You must set the variable to an integer value');
          }
        });
      } else if (input.slice(0, 5) === 'UNSET') {
        if (transactions[0]) {
          transactions.forEach((transaction) => {
            transaction.forEach((variable) => {
              if (variable === setVar) {
                variables.splice(index, 1);
              } else {
                console.log('Your variable cannot be found');
              }
            });
          });
        } else if (variables[0]) {
          variables.forEach((variable, index) => {
            if (variable === setVar) {
              variables.splice(index, 1);
            } else {
              console.log('Your variable cannot be found');
            }
          });
        } else {
          console.log('You must set a variable first');
        }
      } else if (input.slice(0, 5) === 'BEGIN') {
        transactions.push([]);
      } else if (input.slice(0, 8) === 'ROLLBACK') {
        if (transactions[0]) {
          transactions.pop();
        } else {
          console.log('NO TRANSACTION');
        }
      } else if (input.slice(0, 6) === 'COMMIT') {
        if (transactions[0]) {
          transactions.forEach((transaction) => {
            variables.push(transaction);
          });

          transactions = [];
        } else {
          console.log('NO TRANSACTION');
        }
      }

      // for your viewing pleaseure :)
      // console.log(transactions);
      // console.log(variables);

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
