import { createSlice } from '@reduxjs/toolkit';

//Holds calculation
const initialState = {
  calcString: "",
  value: "",
  func: false
};

export const calcSlice = createSlice({
  name: 'calculator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateCalcString: (state, action) => {
      state.calcString += action.payload;
    },
    updateCalcValue: (state, action) => {
      state.value += action.payload.value;
      state.func = action.payload.func;

    },
    clearCalcString: (state) => {
      state.calcString = "";
    },
    clearCalcValue: (state) => {
      state.value = "";
    },
    setTotal: (state, action) => {
      state.calcString += action.payload;
      state.value = "";
    }
  }
});

export const { updateCalcString, updateCalcValue, clearCalcString, clearCalcValue, setTotal } = calcSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCalc = (state) => state.calculator.calcString;
export const selectValue = (state) => state.calculator.value;
export const selectFunc = (state) => state.calculator.func;

export default calcSlice.reducer;
