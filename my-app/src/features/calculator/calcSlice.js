import { createSlice } from '@reduxjs/toolkit';

//Holds calculation
const initialState = {
  calcString: ""
};

export const calcSlice = createSlice({
  name: 'calculator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateCalcString: (state, action) => {
      state.calcString += action.payload;
    },
    clearCalcString: (state) => {
      state.calcString = "";
    },
    setTotal: (state, action) => {
      state.calcString = action.payload;
    }
  }
});

export const { updateCalcString, clearCalcString, setTotal } = calcSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCalc = (state) => state.calculator.calcString;

export default calcSlice.reducer;
