// Time O(n), Space O(1)
function getBalanceByCategoryInPeriod (transactions = [], category, start, end) {
    const utcStart = new Date(start).getTime();
    const utcEnd = new Date(end).getTime();
    let result = 0;

    if (transactions.length === 0) {
        return result;
    }

    transactions.forEach(({ amount, category: itemCategory, time, id }) => {
        const utcTime = new Date(time).getTime();
        const isValidCategory = category === itemCategory;
        const isValidDateInterval = utcTime >= utcStart && utcTime < utcEnd;

        if (isValidCategory && isValidDateInterval) {
            result += amount;
        }
    });

    return result;
}

module.exports = {
    getBalanceByCategoryInPeriod,
}
