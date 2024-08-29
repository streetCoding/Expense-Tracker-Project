import { configureStore } from '@reduxjs/toolkit';
import selectedOptionReducer from './slices/expenses/selectedOptionSlice.js';
import expensesReducer from './slices/expenses/expensesSlice.js';
import moneySpentReducer from './slices/expenses/moneyspentSlice.js';
import expenseDescriptionReducer from './slices/expenses/expenseDescriptionSlice.js';
import authReducer from './slices/authReducer.js';

const store = configureStore({
  reducer: {
    selectedOption: selectedOptionReducer,
    expenses: expensesReducer,
    moneySpent: moneySpentReducer,
    expenseDescription: expenseDescriptionReducer,
    authorized: authReducer,
  }
});

export default store;
