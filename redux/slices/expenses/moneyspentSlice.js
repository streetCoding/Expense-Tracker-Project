import { createSlice } from '@reduxjs/toolkit';

const moneySpentSlice = createSlice({
  name: 'moneySpent',
  initialState: '',
  reducers: {
    setMoneySpent(state, action) {
      return action.payload;
    }
  }
});

export const { setMoneySpent } = moneySpentSlice.actions;
export default moneySpentSlice.reducer;
