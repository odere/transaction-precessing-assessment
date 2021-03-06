// Time O(n^2), Space O(n)
function findDuplicateTransactions(transactions = []) {
  if (transactions.length === 0) {
    return [];
  }

  // Helper
  const getTimeStamp = (time) => new Date(time).getTime();

  const generateHashKey = (transaction) => {
    const { sourceAccount, targetAccount, amount, category } = transaction;
    return `${sourceAccount}${targetAccount}${amount}${category}`;
  };

  // Helper
  const getDuplicatesGroups = (groups) =>
    groups.filter((group) => group.length > 1);

  let hashMap = {};

  // Using Map to separate transactions
  transactions
    .sort((current, next) => {
      // Sort transactions
      const { time: currentTime } = current;
      const { time: nextTime } = next;

      return getTimeStamp(currentTime) - getTimeStamp(nextTime);
    })
    .forEach((transaction) => {
      const groupHash = generateHashKey(transaction);

      if (hashMap[groupHash] === undefined) {
        hashMap[groupHash] = [transaction];
      } else {
        hashMap[groupHash].push(transaction);
      }
    });

  const transactionGroups = Object.values(hashMap)
    .sort((current, next) => {
      // Sort groups
      const { time: currentTime } = current[current.length - 1];
      const { time: nextTime } = next[next.length - 1];

      return getTimeStamp(currentTime) - getTimeStamp(nextTime);
    })
    .map((group) => {
      const minute = 1000 * 60;
      const duplicatedTransactions = [];
      const lengthWithoutLast = group.length - 2;
      let isValidFlag = false;

      for (let i = 0; i <= lengthWithoutLast; i += 1) {
        const current = group[i];
        const next = group[i + 1];
        const isLastButOne = i === group.length - 2;

        const currentTime = getTimeStamp(current.time);
        const nextTime = getTimeStamp(next.time);

        if (currentTime > nextTime - minute) {
          duplicatedTransactions.push(current);
          isValidFlag = true;

          if (i === lengthWithoutLast) {
            duplicatedTransactions.push(next);
          }
        } else {
            if (isValidFlag) {
                duplicatedTransactions.push(current);
                isValidFlag = false;
            }
        }
      }

      return duplicatedTransactions;
    });

  return getDuplicatesGroups(transactionGroups);
}

module.exports = {
  findDuplicateTransactions,
};
