import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTotal,
  updateCalcString,
  clearCalcString,
  selectCalc
} from './calcSlice';
import styles from './Calculator.module.css';

export function Calculator() {
  const calcString = useSelector(selectCalc);
  const dispatch = useDispatch();
  const addValue = (value) => {
    //This should use the current calcString and perform string validation.
    //If string is more than 10 characters, do nothing
    //If string does not contain a period, only allow one 0
    //If string does
    dispatch(updateCalcString(value));
  }

  return (
    <div>
      
    </div>
  );
}
