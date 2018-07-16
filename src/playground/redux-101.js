
import { createStore } from 'redux';

//action generators

const incrementCount = (obj = {}) => ({
   type: 'INCREMENT',
   incrementBy: Number(obj.incrementBy) || 1
});

const decrementCount = (obj = {}) => ({
   type: 'DECREMENT',
   decrementBy: Number(obj.decrementBy) || 1
});

const setCount = (obj = {}) => {
   let action = (Number(obj.count)) ? { type:'SET', count:obj.count } : { type:'SET' };
   return action;
};

const resetCount = () => ({
   type:'RESET',
   count:0
})

//reducers
// 1. reducers are pure functions
// 2. never change state or action

const countReducer = (state = { count:0 }, action) => {
   switch (action.type) {
      case 'INCREMENT' :
         return {
            count: state.count + action.incrementBy
         };
      case 'DECREMENT' :
         return {
            count: state.count - action.decrementBy
         };
      case 'SET' :
         if (!isNaN(action.count)) {
            return {
               count:action.count
            }
         } else {
            return state;
         }
      case 'RESET' :
         return {
            count: 0
         };
      default :
         return state;
   }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
   console.log(store.getState());
})

// store.dispatch({
//    type: 'INCREMENT',
//    incimentBy:5
// });

// store.dispatch(
//    incrementCount({ incrmentBy:5 })
// );

// store.dispatch(
//    decrementCount({ decrementBy:10 })
// );

store.dispatch(
   setCount({ count:'bob' })
)

store.dispatch(resetCount());

// store.dispatch({
//    type: 'DECREMENT'
// });

