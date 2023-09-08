import axios from 'axios';

const BACKEND_URL = 'https://react-native-expense-tra-bc90a-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
  const resp = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
  return resp.data.name;
}

export async function fetchExpenses() {
  const resp = await axios.get(`${BACKEND_URL}/expenses.json`)
  
  const expenses = [];
  
  for (const key in resp.data) {
    const  expenseObj = {
      id: key,
      amount: resp.data[key].amount,
      date: new Date(resp.data[key].date),
      description: resp.data[key].description
    }
    expenses.push(expenseObj);
  }
  
  return expenses;
}

export function  updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}