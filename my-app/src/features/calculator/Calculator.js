import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTotal,
  updateCalcString,
  updateCalcValue,
  clearCalcString,
  clearCalcValue,
  selectCalc,
  selectValue,
  selectFunc
} from './calcSlice';
import styles from './Calculator.module.css';

export function Calculator() {
  const calcString = useSelector(selectCalc);
  const calcValue = useSelector(selectValue);
  const calcFunc = useSelector(selectFunc);
  const dispatch = useDispatch();
  const addValue = (value, func) => {
    console.log("Current value = ", calcValue);
    console.log("Current func bool = ", calcFunc);
    console.log("New value = ", value);
    console.log("New func = ", func);
    if (func === calcFunc && func) {
      //Adding func to value
      //Get length of current value, if 0, then add func.
      //Else if 1, if value is '-' then append the value
      //else replace current value with value
      if (calcValue.length === 1 && value === '-') {
        dispatch(updateCalcValue({"value": value, "func": func}));
      }
      else {
        dispatch(clearCalcValue());
        dispatch(updateCalcValue({"value": value, "func": func}));
      }
    }
    else if (func === calcFunc && !func) {
      console.log("Not implemented yet");
    }
    else {
      dispatch(updateCalcValue({"value": value, "func": func}));
    }
  }

  return (
    <div>
      <h3>{calcFunc}</h3>
      <h3>{calcString}</h3>
      <h2>{calcValue}</h2>
      <button onClick={() => {addValue("1", false)}}>1</button>
      <button onClick={() => {addValue("2", false)}}>2</button>
      <button onClick={() => {addValue("3", false)}}>3</button>
      <button onClick={() => {addValue("4", false)}}>4</button>
      <button onClick={() => {addValue("5", false)}}>5</button>
      <button onClick={() => {addValue("6", false)}}>6</button>
      <button onClick={() => {addValue("7", false)}}>7</button>
      <button onClick={() => {addValue("8", false)}}>8</button>
      <button onClick={() => {addValue("9", false)}}>9</button>
      <button onClick={() => {addValue("0", false)}}>0</button>
      <button onClick={() => {addValue(".", false)}}>.</button>
      <button onClick={() => {addValue("X", true)}}>X</button>
      <button onClick={() => {addValue("-", true)}}>-</button>
      <button onClick={() => {addValue("+", true)}}>+</button>
      <button onClick={() => {addValue("/", true)}}>/</button>
      <button>=</button>
      <button>AC</button>
    </div>
  );
}
