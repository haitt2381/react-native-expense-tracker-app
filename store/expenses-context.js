import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [], 
  addExpense: ({description, amount, date}) => {}, 
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id},...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  
  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  } 
  
  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: { id, data: expenseData }});
  }
  
  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  }
  
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A Pair of shoes',
    amount: 69.99,
    date: new Date('2023-9-1')
  },
  {
    id: 'e2',
    description: 'A Pair of trousers',
    amount: 89.29,
    date: new Date('2021-01-05')
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-01')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19')
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.99,
    date: new Date('2022-02-18')
  },
]