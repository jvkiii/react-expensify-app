
import moment from 'moment';
import { getFilteredExpenses } from '../../selectors/expenses';
import expenses from '../fixtures/expenses';


test('should filter expenses by text value', () => {
   const filters = {
      text:'e',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined
   }
   const result = getFilteredExpenses(expenses, filters); 

   expect(result).toEqual([expenses[2], expenses[1]]);
})

test('should filter expenses by start date', () => {
   const filters = {
      text:'',
      sortBy: 'date',
      startDate: moment(0),
      endDate: undefined
   }
   const result = getFilteredExpenses(expenses, filters); 

   expect(result).toEqual([expenses[2], expenses[0]]);
})

test('should filter expenses by end date', () => {
   const filters = {
      text:'',
      sortBy: 'date',
      startDate: undefined,
      endDate: moment(0)
   }
   const result = getFilteredExpenses(expenses, filters); 

   expect(result).toEqual([expenses[0], expenses[1]]);
})

test('should sort expenses by date', () => {
   const filters = {
      text:'',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined
   }
   const result = getFilteredExpenses(expenses, filters); 

   expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
})

test('should sort expenses by amount', () => {
   const filters = {
      text:'',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined
   }
   const result = getFilteredExpenses(expenses, filters); 

   expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
})

// export const getFilteredExpenses = (expenses, filters) => { 
// 	const { text, sortBy, startDate, endDate } = filters;

// 	const filteredArray = expenses.filter( expense => {
// 		const createdAtMoment = moment(expense.createdAt);
// 		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
// 		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
// 		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

// 		return startDateMatch && endDateMatch && textMatch;
// 	})
	
// 	const sortedArray = filteredArray.sort((a, b) => {
// 		if (sortBy === 'date') {
// 			return a.createdAt < b.createdAt ? 1 : -1;
// 		}
// 		else if (sortBy === 'amount') {
// 			return a.amount < b.amount ? 1 : -1;
// 		}
// 	})

// 	return sortedArray;
// }