
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';


//ADD_EXPENSE action generator

test('should setup ADD_EXPENSE action object with provided values', () => {
   const obj = {
      description:'a sample description',
      note: 'a sample note',
      amount: 12345,
      createdAt:12341239052103
   }
   const action = addExpense(obj);

   expect(action).toEqual({
      type: 'ADD_EXPENSE', 
      expense: {
         id:expect.any(String),
         ...obj
      }
   })
})

test('should setup ADD_EXPENSE action object with default values', () => {
   const obj = {};
   const action = addExpense(obj);

   expect(action).toEqual({
      type: 'ADD_EXPENSE', 
      expense: {
         id:expect.any(String),
         description: '',
         note: '',
         amount: 0,
         createdAt: 0
      }
   })
})


//EDIT_EXPENSE action generator

test('should setup EDIT_EXPENSE action object', () => {
   const updates = {
      description:'a sample description',
      note: 'a sample note',
      amount: '12345',
      createdAt:'12341239052103'
   }
   const action = editExpense('1234', updates);

   expect(action).toEqual({
      type:'EDIT_EXPENSE', 
      id:'1234', 
      updates: updates
   });
})


//REMOVE_EXPENSE action generator

test('should setup REMOVE_EXPENSE action object', () => {
   const action = removeExpense('1234');

   expect(action).toEqual({
      type: 'REMOVE_EXPENSE', 
      id: '1234'
   })
})