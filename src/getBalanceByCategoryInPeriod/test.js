const { getBalanceByCategoryInPeriod } = require("./index");

describe("Transaction processing:", () => {
  const mockedCategory = "groceries";
  const mocked2018 = new Date("2018-03-01T08:00:00Z");
  const mocked2019 = new Date("2019-03-01T08:00:00Z");
  const mocked2020 = new Date("2020-03-01T08:00:00Z");
  const mocked2021 = new Date("2021-03-01T08:00:00Z");
  const mocked2022 = new Date("2022-03-01T08:00:00Z");
  const mocked2023 = new Date("2023-03-01T08:00:00Z");
  const transactionsMock = [
    {
      amount: 0,
      category: mockedCategory,
      id: 0,
      sourceAccount: "sourceAccount",
      targetAccount: "targetAccount",
      time: mocked2020,
    },
    {
      amount: 100,
      category: mockedCategory,
      id: 10,
      sourceAccount: "sourceAccount",
      targetAccount: "targetAccount",
      time: mocked2020,
    },
    {
      amount: -100,
      category: mockedCategory,
      id: 110,
      sourceAccount: "sourceAccount",
      targetAccount: "targetAccount",
      time: mocked2020,
    },
    {
      amount: -100,
      category: mockedCategory,
      id: 1,
      sourceAccount: "sourceAccount",
      targetAccount: "targetAccount",
      time: mocked2020,
    },
    {
      amount: 150,
      category: mockedCategory,
      id: 2,
      sourceAccount: "sourceAccount",
      targetAccount: "targetAccount",
      time: mocked2021,
    },
  ];

  describe("1 Challenge getBalanceByCategoryInPeriod:", () => {
    it("should return 0, when no transactions", () => {
      const result = getBalanceByCategoryInPeriod(
        [],
        mockedCategory,
        mocked2020,
        mocked2021
      );

      expect(result).toBe(0);
    });

    it("should return 0, when do not match category", () => {
      const result = getBalanceByCategoryInPeriod(
        transactionsMock,
        "wrongCategory",
        mocked2020,
        mocked2021
      );

      expect(result).toBe(0);
    });

    it("should return 0, when do not match date interval", () => {
      let result = getBalanceByCategoryInPeriod(
        transactionsMock,
        mockedCategory,
        mocked2018,
        mocked2019
      );

      expect(result).toBe(0);

      result = getBalanceByCategoryInPeriod(
        transactionsMock,
        mockedCategory,
        mocked2022,
        mocked2023
      );

      expect(result).toBe(0);

      result = getBalanceByCategoryInPeriod(
        transactionsMock,
        mockedCategory,
        mocked2023,
        mocked2023
      );

      expect(result).toBe(0);
    });

    it("should includes transactions on `start` and excludes transactions on `end`", () => {
      let result = getBalanceByCategoryInPeriod(
        transactionsMock,
        mockedCategory,
        mocked2020,
        mocked2021
      );

      // id0 + id1 exclude id2
      expect(result).toBe(-100);
  
      // the same day on end excludes
      result = getBalanceByCategoryInPeriod(
        transactionsMock,
        mockedCategory,
        mocked2021,
        mocked2021
      );

      expect(result).toBe(0);
    });

    it("should return balance, when match category and date interval", () => {
        let result = getBalanceByCategoryInPeriod(
          transactionsMock,
          mockedCategory,
          mocked2018,
          mocked2023
        );
  
        // id0 + id1 + id2
        expect(result).toBe(50);
  
        // id0 + id1
        result = getBalanceByCategoryInPeriod(
          transactionsMock,
          mockedCategory,
          mocked2021,
          mocked2023
        );
  
        expect(result).toBe(150);
      });
  });
});
