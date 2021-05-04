# transaction-precessing-assesment

You will be provided with a list of transactions from a consumer bank account and you need to process them.

Take your time and make sure that you consider your solutions production-ready. Although a timer is shown, there is no limit and we do not take time into consideration when reviewing your solution. The editor supports most modern language constructs, so feel free to use whatever you think makes your solution easier to read.

## Some information to help you

Each transaction has the following information:

- Transaction ID
- Source account number
- Target account number
- Amount (expenses are negative values, income transactions are positive values)
- Transaction time (date and time to seconds precision)
- Category (one of the following values: 'groceries', 'eating_out', 'other', 'salary')

The transactions are not sorted in any particular order.

## Example transaction objects

Expense:

```json
{
  id: 123,
  sourceAccount: 'my_account',
  targetAccount: 'coffee_shop',
  amount: -30,
  category: 'eating_out',
  time: '2018-03-12T12:34:00Z'
}
```

Income:

```json
{
  id: 123,
  sourceAccount: 'the_company',
  targetAccount: 'my_account',
  amount: 10000,
  category: 'salary',
  time: '2018-03-01T08:00:00Z'
}
```

## 1 Challenge Balance by category

Calculate the balance in a specific category within the specified time period.

```JavaScript
getBalanceByCategoryInPeriod(transactionsList, category, startTime, endTime)
```

### Input

You can assume that all parameters will always be present and valid.

- list of transactions (Transaction[])
- category (String)
- start time (inclusive) (Date)
- end time (exclusive) (Date)

### Output

- Total balance (Number)

Negative number means money spent.

## 2 Challenge
