import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'; //generate universal random id

//action generators

const addExpense = (obj = {}) => ({
   type: 'ADD_EXPENSE', 
   expense: {
		id:uuid(),
		description: obj.description || '',
		note: obj.note || '',
		amount: obj.amount || 0,
		createdAt: obj.createdAt || 0
   } 
})

const editExpense = (id, obj) => ({
	type: 'EDIT_EXPENSE', 
	id,
   updates: obj
})

const removeExpense = (obj = {}) => ({
   type: 'REMOVE_EXPENSE', 
   id: obj.id || 0
})

const setTextFilter = (text='') => ({
	type: 'SET_TEXT_FILTER',
	text
})

const sortByAmount = () => ({
	type: 'SET_SORT_BY_AMOUNT'
})

const sortByDate = () => ({
	type: 'SET_SORT_BY_DATE'
})

const setStartDate = (date) => ({
	type: 'SET_START_DATE',
	date
})

const setEndDate = (date) => ({
	type: 'SET_END_DATE',
	date
})


//reducers

const expensesReducer = (state = [], action) => {
   switch (action.type) {
      case 'ADD_EXPENSE' :
			return [...state, action.expense];

		case 'REMOVE_EXPENSE' :
			return state.filter( expense => expense.id !== action.id );

		case 'EDIT_EXPENSE' :
			return state.map( expense => {
				if (expense.id === action.id) {
					return {...expense, ...action.updates};
				} else {
					return expense;
				}
			})
		
      default : 
         return state;
   }
}

const filterDefaultState = {
   text:'',
   sortBy: 'date',
   startDate: undefined,
   endDate: undefined
}
const filtersReducer = (state = filterDefaultState, action) => {
   switch (action.type) {
		case 'SET_TEXT_FILTER' :
			return { ...state, text:action.text };

		case 'SET_SORT_BY_AMOUNT' :
			return { ...state, sortBy:'amount' }

		case 'SET_SORT_BY_DATE' :
			return { ...state, sortBy:'date' }

		case 'SET_START_DATE' :
			return { ...state, startDate: action.date };

		case 'SET_END_DATE' :
			return { ...state, endDate: action.date };

      default: 
         return state;
   }
}

//selectors

const getVisibleExpenses = (expenses, filters) => { 
	const { text, sortBy, startDate, endDate } = filters;

	const filteredArray = expenses.filter( expense => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	})
	
	const sortedArray = filteredArray.sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		}
		else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	})

	return sortedArray;
}

//store

const store = createStore(
   combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
   })
);

//listener

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
})

//dispatch actions

const exp1 = store.dispatch(
	addExpense({
		description: 'Rent',
		amount:500,
		createdAt:-1000
	})
)

const exp2 = store.dispatch(
	addExpense({
		description: 'Coffee',
		amount:100,
		createdAt:800
	})
)

const exp3 = store.dispatch(
	addExpense({
		description: 'Poop',
		amount:200,
		createdAt:200
	})
)

// const exp3 = store.dispatch(
// 	editExpense( exp2.expense.id, { amount: 500, bud:'light' })
// )

// store.dispatch(
// 	removeExpense({ id:exp1.expense.id })
// )

// store.dispatch(
// 	setTextFilter('rent')
// )
// store.dispatch(
// 	setTextFilter('')
// )

store.dispatch(
	sortByAmount()
)
// store.dispatch(
// 	sortByDate()
// )

// store.dispatch(
// 	setStartDate(125)
// )
// store.dispatch(
// 	setStartDate()
// )
// store.dispatch(
// 	setEndDate(1250)
// )


const demoState = {
   expenses: [{
      id: 'boom',
      description: 'Jan rent',
      note: 'THis was the final payment for that address',
      amount: 54500, //pennies
      createdAt:0
   }],
   filters: {
      text: 'rent',
      sortBy: 'date', //date or amount
      startDate: undefined,
      endDate: undefined
   }
}