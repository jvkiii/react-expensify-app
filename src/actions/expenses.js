
import uuid from 'uuid'; //generate universal random id

export const addExpense = (obj = {}) => ({
   type: 'ADD_EXPENSE', 
   expense: {
		id:uuid(),
		description: obj.description || '',
		note: obj.note || '',
		amount: obj.amount || 0,
		createdAt: obj.createdAt || 0
   } 
})

export const editExpense = (id, obj) => ({
	type: 'EDIT_EXPENSE', 
	id,
   updates: obj
})

export const removeExpense = (id = 0) => ({
   type: 'REMOVE_EXPENSE', 
   id
})