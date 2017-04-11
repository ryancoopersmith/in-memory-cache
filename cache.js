// Check README before running
let prompt = require('prompt');

let variables = [];
let transactions = [];

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

    if (input !== 'END') {
      if (input.slice(0, 3) === 'SET') {
        let setVar = input.slice(4);
        let setVarArray = setVar.split('');
        let counter = 0;

        setVarArray.every((char, index) => {
          if (parseInt(char)) {
            let variable = setVar.slice(0, index - 1);
            let value = parseInt(setVar.slice(index));
            if (transactions[0]) {
              transactions[transactions.length - 1].push([variable, value]);
              return false;
            } else {
              variables.push([variable, value]);
              return false;
            }
            counter ++;
          }

          if (index - counter === setVarArray.length - 1) {
            console.log('You must set the variable to an integer value');
          }
          return true
        });
      } else if (input.slice(0, 5) === 'UNSET') {
        let setVar = input.slice(6);
        let found = false;

        if (!transactions[0] && !variables[0]) {
          console.log('You must set a variable first');
        }

        if (transactions[0]) {
          transactions.forEach((transaction) => {
            transaction.forEach((variable) => {
              if (variable[0] === setVar) {
                variables.splice(index, 1);
                found = true;
              }
            });
          });
        } else if (variables[0]) {
          variables.forEach((variable, index) => {
            if (variable[0] === setVar) {
              variables.splice(index, 1);
              found = true;
            }
          });
        }

        if (!found) {
          console.log('Your variable cannot be found');
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

      // for your viewing pleaseure
      console.log(`transactions: ${transactions}`);
      console.log(`variables: ${variables}`);

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
