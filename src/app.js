
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { getFilteredExpenses } from './selectors/expenses';

import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
   const state = store.getState();
   const filteredExpenses = getFilteredExpenses(state.expenses, state.filters);
   console.log(filteredExpenses);
})

store.dispatch(addExpense({description:'Gas Bill', amount:4500}));
store.dispatch(addExpense({description:'Water Bill', createdAt: 22345}));
store.dispatch(addExpense({description:'Rent Bill', amount: 109500, createdAt: 1000}));

const jsx = (
   <Provider store={store}>
      <AppRouter />
   </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));