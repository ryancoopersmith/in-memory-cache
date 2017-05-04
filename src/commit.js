module.exports = (cache) => {
  if (cache.transactions[0]) {
    cache.transactions.forEach((transaction) => {
      cache.variables.push(transaction);
    });

    cache.transactions = [];
  } else {
    console.log('NO TRANSACTION');
  }
}
