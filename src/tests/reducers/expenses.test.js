import moment from 'moment';
import expensesReducer from '../../reducers/expenses';

const defaultState = [];
const expenses = [{
   id:'1',
   description:'Gum',
   note:'',
   amount:195,
   createdAt:0
}, {
   id:'2',
   description:'Rent',
   note:'',
   amount:109500,
   createdAt:moment(0).subtract(4, 'days').valueOf()
}, {
   id:'3',
   description:'Credit Card',
   note:'',
   amount:4500,
   createdAt:moment(0).add(4, 'days').valueOf()
}];

test('should setup default expenses values', () => {
   const state = expensesReducer(undefined, {type: '@@INIT'});

   expect(state).toEqual(defaultState);
})


// ADD_EXPENSE

test('should add a new expense', () => {
   const action = { 
      type: 'ADD_EXPENSE', 
      expense: {
         id:expect.any(String),
         description: 'New Bill',
         note: 'new bill note',
         amount: 500,
         createdAt: 1000
      } 
   };
   const state = expensesReducer(expenses, action);

   expect(state).toEqual([...expenses, action.expense]);
})


//EDIT_EXPENSE

test('should edit an expense', () => {
   const action = { 
      type: 'EDIT_EXPENSE', 
      id: expenses[0].id,
      updates: {
         description: 'Gum Bill',
         note: 'gum bill edited note',
         amount: 500,
         createdAt: 1000
      } 
   };
   const state = expensesReducer(expenses, action);

   expect(state).toEqual(
      [{
         ...expenses[0], 
         description:action.updates.description,
         note: action.updates.note,
         amount: action.updates.amount,
         createdAt: action.updates.createdAt
      }, expenses[1], expenses[2] ]);
})

test('should not edit an expense if expense not found', () => {
   const action = { 
      type: 'EDIT_EXPENSE', 
      id: '-1',
      updates: {
         description: 'Gum Bill',
         note: 'gum bill edited note',
         amount: 500,
         createdAt: 1000
      } 
   };
   const state = expensesReducer(expenses, action);

   expect(state).toEqual(expenses);
})


//REMOVE_EXPENSE

test('should remove expense by id', () => {
   const action = { 
      type: 'REMOVE_EXPENSE', 
      id:expenses[1].id 
   };
   const state = expensesReducer(expenses, action);

   expect(state).toEqual([expenses[0],expenses[2]]);
})

test('should not remove expense if id not found', () => {
   const action = { 
      type: 'REMOVE_EXPENSE',
      id:'-1'
   };
   const state = expensesReducer(expenses, action);

   expect(state).toEqual(expenses);
})