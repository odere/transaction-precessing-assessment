const { performance, PerformanceObserver } = require("perf_hooks");

const {
  getBalanceByCategoryInPeriod: firstChallenge,
} = require("./getBalanceByCategoryInPeriod");
const {
  findDuplicateTransactions: secondChallenge,
} = require("./findDuplicateTransactions");

const iterations = 10000;
const category = "category";
const time = "2020-03-12T00:00:00Z";
const fewTransactions = Array.from({ length: 10 }, (_, i) => ({
  items: 10,
  category,
  id: i,
  sourceAccount: "sourceAccount",
  targetAccount: "targetAccount",
  time,
}));
const manyTransactions = Array.from({ length: 1000 }, (_, i) => ({
  items: 1000,
  category,
  id: i,
  sourceAccount: "sourceAccount",
  targetAccount: "targetAccount",
  time,
}));

const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];
  const duration = entry.duration;
  const name = entry.name;
  const items = entry[0][0].items;
  console.log(`${name} ${iterations} with ${items} transactions`, duration);
});

obs.observe({ entryTypes: ["function"] });

const getBalanceByCategoryInPeriod = (transactions) => {
  for (var i = 0; i < iterations; i++) {
    firstChallenge(transactions, category, time, time);
  }
};
const wrappedFirstChallenge = performance.timerify(
  getBalanceByCategoryInPeriod
);

const findDuplicateTransactions = (transactions) => {
  for (var i = 0; i < iterations; i++) {
    secondChallenge(transactions);
  }
};
const wrappedSecondChallenge = performance.timerify(
  findDuplicateTransactions
);

wrappedFirstChallenge(fewTransactions);
wrappedFirstChallenge(manyTransactions);

wrappedSecondChallenge(fewTransactions);
wrappedSecondChallenge(manyTransactions);

obs.disconnect();
