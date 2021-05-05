const { findDuplicateTransactions } = require("./index");

describe("Transaction processing:", () => {
  describe("2 Challenge findDuplicateTransactions:", () => {
    it("should return empty array when no transactions", () => {
      const result = findDuplicateTransactions([]);

      expect(result).toEqual([]);
    });

    it("should return empty array when no similar transactions", () => {
      const result = findDuplicateTransactions([
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "A",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z",
        },
        {
          id: 2,
          sourceAccount: "B",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:31.000Z",
        },
        {
          id: 3,
          sourceAccount: "C",
          targetAccount: "C",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:32.000Z",
        },
      ]);

      expect(result).toEqual([]);
    });

    it("should return empty array when similar transactions have difference more than 1 minute", () => {
      const result = findDuplicateTransactions([
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "A",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z",
        },
        {
          id: 2,
          sourceAccount: "A",
          targetAccount: "A",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:36:30.000Z",
        },
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "A",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:38:30.000Z",
        },
      ]);

      expect(result).toEqual([]);
    });

    it("should return consecutive transactions", () => {
      const data = [
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z",
        },
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:00.000Z",
        },
        {
          id: 6,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:05.000Z",
        },
        {
          id: 4,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:36:00.000Z",
        },
        {
          id: 2,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:50.000Z",
        },
        {
          id: 5,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:00.000Z",
        },
      ];

      const expectedResult = [
        [
          {
            id: 5,
            sourceAccount: "A",
            targetAccount: "C",
            amount: 250,
            category: "other",
            time: "2018-03-02T10:33:00.000Z",
          },
          {
            id: 6,
            sourceAccount: "A",
            targetAccount: "C",
            amount: 250,
            category: "other",
            time: "2018-03-02T10:33:05.000Z",
          },
        ],
        [
          {
            id: 1,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:33:00.000Z",
          },
          {
            id: 2,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:33:50.000Z",
          },
          {
            id: 3,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:34:30.000Z",
          },
        ],
      ];
      const result = findDuplicateTransactions(data);

      expect(result).toEqual(expectedResult);
    });

    it("should return sorted groups by time ascending", () => {
      const data = [
        {
          id: 2,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-03-01T12:34:00.000Z",
        },
        {
          id: 5,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-03-02T09:25:20.000Z",
        },
        {
          id: 30,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:54:21.000Z",
        },
        {
          id: 31,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:55:10.000Z",
        },
        {
          id: 32,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:56:09.000Z",
        },
        {
          id: 13,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-04-01T10:24:00.000Z",
        },
        {
          id: 15,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-04-01T10:25:10.000Z",
        },
        {
          id: 14,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-04-01T10:24:40.000Z",
        },
        {
          id: 6,
          sourceAccount: "my_account",
          targetAccount: "internet_shop",
          amount: -250,
          category: "other",
          time: "2018-03-01T22:16:40.000Z",
        },
        {
          id: 33,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:57:05.000Z",
        },
        {
          id: 34,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:59:05.000Z",
        },
        {
          id: 35,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T10:03:05.000Z",
        },
        {
          id: 102,
          sourceAccount: "my_account",
          targetAccount: "internet_shop",
          amount: -250,
          category: "other",
          time: "2018-03-01T22:16:50.000Z",
        },
      ];

      const expectedResult = [
        [
          {
            id: 6,
            sourceAccount: "my_account",
            targetAccount: "internet_shop",
            amount: -250,
            category: "other",
            time: "2018-03-01T22:16:40.000Z",
          },
          {
            id: 102,
            sourceAccount: "my_account",
            targetAccount: "internet_shop",
            amount: -250,
            category: "other",
            time: "2018-03-01T22:16:50.000Z",
          },
        ],
        [
          {
            id: 13,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -50,
            category: "eating_out",
            time: "2018-04-01T10:24:00.000Z",
          },
          {
            id: 14,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -50,
            category: "eating_out",
            time: "2018-04-01T10:24:40.000Z",
          },
          {
            id: 15,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -50,
            category: "eating_out",
            time: "2018-04-01T10:25:10.000Z",
          },
        ],
        [
          {
            id: 30,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:54:21.000Z",
          },
          {
            id: 31,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:55:10.000Z",
          },
          {
            id: 32,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:56:09.000Z",
          },
          {
            id: 33,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:57:05.000Z",
          },
        ],
      ];
      const result = findDuplicateTransactions(data);

      expect(result).toEqual(expectedResult);
    });
  });
});
