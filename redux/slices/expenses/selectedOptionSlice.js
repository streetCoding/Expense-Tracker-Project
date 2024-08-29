import { createSlice } from '@reduxjs/toolkit';

const selectedOptionSlice = createSlice({
  name: 'selectedOption',
  initialState: 'Food',
  reducers: {
    setSelectedOption(state, action) {
      return action.payload;
    }
  }
});

export const { setSelectedOption } = selectedOptionSlice.actions;
export default selectedOptionSlice.reducer;
