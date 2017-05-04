// Check README before running

let begin = require('./src/begin');
let commit = require('./src/commit');
let get = require('./src/get');
let numequalto = require('./src/numequalto');
let rollback = require('./src/rollback');
let set = require('./src/set');
let unset = require('./src/unset');

let prompt = require('prompt');

let cache = {};
cache.variables = [];
cache.transactions = [];

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
        set(input, cache);
      } else if (input.slice(0, 3) === 'GET') {
        get(input, cache);
      } else if (input.slice(0, 10) === 'NUMEQUALTO') {
        numequalto(input, cache);
      } else if (input.slice(0, 5) === 'UNSET') {
        unset(input, cache);
      } else if (input.slice(0, 5) === 'BEGIN') {
        begin(cache);
      } else if (input.slice(0, 8) === 'ROLLBACK') {
        rollback(cache);
      } else if (input.slice(0, 6) === 'COMMIT') {
        commit(cache);
      }

      // for your viewing pleaseure

      // console.log(`cache.transactions: ${cache.transactions}`);
      // console.log(`cache.variables: ${cache.variables}`);

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
