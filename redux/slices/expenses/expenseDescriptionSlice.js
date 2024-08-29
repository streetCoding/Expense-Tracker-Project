import { createSlice } from '@reduxjs/toolkit';

const expenseDescriptionSlice = createSlice({
  name: 'expenseDescription',
  initialState: '',
  reducers: {
    setExpenseDescription(state, action) {
      return action.payload;
    }
  }
});

export const { setExpenseDescription } = expenseDescriptionSlice.actions;
export default expenseDescriptionSlice.reducer;
