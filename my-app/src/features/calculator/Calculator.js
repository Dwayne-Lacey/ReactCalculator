import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  const dispatch = useDispatch();
  const addValue = (value, func) => {
    if (calcString.includes("=")) {
      dispatch(clearCalcString());
    }
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
      //Add validation to ensure only 1 '.' can exist
      //If '.' doesn't exist in string, add validation to prevent adding more than 1 zero
      //If value equals '0', replace with 
      if (calcString.includes("=")) {
        dispatch(clearCalcValue());
      }
      const periodVal = calcValue.includes(".") && value === ".";
      const zeroVal = calcValue === "0" && value === "0";
      if (!periodVal && !zeroVal && calcValue.length < 10) {
        dispatch(updateCalcValue({"value": value, "func": func}));
      }
    }
    else if (func !== calcFunc) {
      //This means the current value should be pushed to the calc string, value should be cleared, and then input taken
      dispatch(updateCalcString(calcValue + " "));
      dispatch(clearCalcValue());
      dispatch(updateCalcValue({"value": value, "func": func}));
    }
    else {
      dispatch(updateCalcValue({"value": value, "func": func}));
    }
  }

  const sumCalcString = () => {
    if (calcString.includes("=")) {
      dispatch(clearCalcString());
    }
    let sum = 0
    let operator = "";
    let negative = 0;
    let breakpoint = /\s+/;
    let calcArr = calcString.split(breakpoint);
    calcArr = calcArr.filter(val => val !== "");
    calcArr.push(calcValue);
    console.log(calcArr);
    calcArr.forEach(val =>  {
      if (isNumeric(val)) {
        val = parseFloat(val);
        switch (operator) {
          case '+':
            sum = negative ? sum + (-1 * val) : sum + val;
            break;
          case '-':
            sum = negative ? sum - (-1 * val) : sum - val;
            break;
          case 'X':
            sum = negative ? sum * (-1 * val) : sum * val;
            break;
          case '/':
            sum = negative ? sum / (-1 * val) : sum / val;
            break;
          default:
            sum = val;
        }
      }
      else {
        negative = val.length === 2;
        operator = val[0];
      }
    });
    dispatch(updateCalcString(calcValue + " = "));
    dispatch(clearCalcValue());
    dispatch(updateCalcValue({"value": sum, "func": false}));
  };

  const clearMemory = () => {
    dispatch(clearCalcString());
    dispatch(clearCalcValue());
  };

  return (
    <div>
      <h3>{calcFunc}</h3>
      <h3>{calcString}{calcValue}</h3>
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
      <button id="multiply" onClick={() => {addValue("X", true)}}>X</button>
      <button id="subtract" onClick={() => {addValue("-", true)}}>-</button>
      <button id="add" onClick={() => {addValue("+", true)}}>+</button>
      <button id="divide" onClick={() => {addValue("/", true)}}>/</button>
      <button onClick={sumCalcString}>=</button>
      <button onClick={clearMemory}>AC</button>
    </div>
  );
}
