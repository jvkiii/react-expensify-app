import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = (props) => (
   <div>
      
      <ExpenseForm 
         expense={props.expense}
         onFormSubmit={ expense => {
            console.log(expense);

            //send action
            props.dispatch(editExpense(props.expense.id, expense));

            //go to homepage
            props.history.push('/');
         }}
      />

      <button onClick={e => {
         props.dispatch(removeExpense(props.expense.id));
         props.history.push('/');
      }}>Remove</button>
   </div>
)

const mapStateToProps = (state, props) => {
   return {
      expense: state.expenses.find(expense => expense.id === props.match.params.id)
   }
};

export default connect(mapStateToProps)(EditExpensePage);