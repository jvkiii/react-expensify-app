
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import { getFilteredExpenses } from '../selectors/expenses';

export const ExpenseList = (props) => (
   <div>
      { 
         props.expenses.length === 0 ? (
            <p>No expenses</p>
         ) : (
            <ul>
               {props.expenses.map( (expense, i) => {
                  return <ExpenseListItem key={i} {...expense} />
               })}
            </ul>
         )
      }
   </div>
)

const mapStateToProps = state => {
   return {
      expenses: getFilteredExpenses(state.expenses, state.filters)
   }
};

export default connect(mapStateToProps)(ExpenseList);