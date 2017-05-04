module.exports = (cache) => {
  if (cache.transactions[0]) {
    cache.transactions.pop();
  } else {
    console.log('NO TRANSACTION');
  }
}
