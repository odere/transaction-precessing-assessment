const { performance, PerformanceObserver } = require("perf_hooks");

const {
  getBalanceByCategoryInPeriod,
} = require("./getBalanceByCategoryInPeriod");

const iterations = 10000;
const category = "category";
const time = "2020-03-12T00:00:00Z";
const fewTransactions = Array.from({ length: 10 }, (_, i) => ({
  amount: 10,
  category,
  id: i,
  sourceAccount: "sourceAccount",
  targetAccount: "targetAccount",
  time,
}));
const manyTransactions = Array.from({ length: 1000 }, (_, i) => ({
  amount: 1000,
  category,
  id: i,
  sourceAccount: "sourceAccount",
  targetAccount: "targetAccount",
  time,
}));

const getBalanceByCategoryInPeriodWithIterrations = (transactions) => {
  for (var i = 0; i < iterations; i++) {
    getBalanceByCategoryInPeriod(transactions, category, time, time);
  }
};
const wrappedFirstChallenge = performance.timerify(
  getBalanceByCategoryInPeriodWithIterrations
);

const obsFirstChallenge = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];
  const duration = entry.duration;
  const items = entry[0][0].amount;
  console.log(`${iterations} with ${items} transactions`, duration);
});

obsFirstChallenge.observe({ entryTypes: ["function"] });

// A performance timeline entry will be created
wrappedFirstChallenge(fewTransactions);
wrappedFirstChallenge(manyTransactions);

obsFirstChallenge.disconnect();
