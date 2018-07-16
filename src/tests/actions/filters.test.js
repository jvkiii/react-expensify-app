
import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate  } from '../../actions/filters';


//SET_TEXT_FILTER action generator

test('should setup SET_TEXT_FILTER action object with provided value', () => {
   const text = 'yahoo';
   const action = setTextFilter(text);

   expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
	   text: text
   })
})

test('should setup SET_TEXT_FILTER action object with default value', () => {
   const action = setTextFilter();

   expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
	   text: ''
   })
})


//SET_SORT_BY_AMOUNT action generator

test('should setup SET_SORT_BY_AMOUNT action object', () => {
   const action = sortByAmount();

   expect(action).toEqual({
      type: 'SET_SORT_BY_AMOUNT'
   })
})


// //SET_SORT_BY_DATE action generator

test('should setup SET_SORT_BY_DATE action object', () => {
   const action = sortByDate();

   expect(action).toEqual({
      type: 'SET_SORT_BY_DATE'
   })
})


// //SET_START_DATE action generator

test('should setup SET_START_DATE action object', () => {
   const date = moment();
   const action = setStartDate(date);

   expect(action).toEqual({
      type: 'SET_START_DATE',
      startDate: date
   })
})


// //SET_END_DATE action generator

test('should setup SET_END_DATE action object', () => {
   const date = moment();
   const action = setEndDate(date);

   expect(action).toEqual({
      type: 'SET_END_DATE',
      endDate: date
   })
})