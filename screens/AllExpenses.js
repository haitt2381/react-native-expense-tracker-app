import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

export default function AllExpenses() {
  let expensesCtx = useContext(ExpensesContext);
  return  <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={'Total'} fallbackText={'No registered expenses found.'}/>
}