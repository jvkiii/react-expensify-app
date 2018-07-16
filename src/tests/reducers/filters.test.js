
import moment from 'moment';
import filtersReducer from '../../reducers/filters';

const defaultState = {
   text:'',
   sortBy: 'date',
   startDate: moment().startOf('month'),
   endDate: moment().endOf('month')
}

test('should setup default filter values', () => {
   const state = filtersReducer(undefined, {type: '@@INIT'});

   expect(state).toEqual(defaultState);
})

test('should setup sortBy to amount', () => {
   const action = { type: 'SET_SORT_BY_AMOUNT' };
   const state = filtersReducer(defaultState, action);

   expect(state).toEqual({...defaultState, sortBy:'amount'});
})

test('should setup sortBy to date', () => {
   const action = { type: 'SET_SORT_BY_DATE' };
   const state = filtersReducer({...defaultState, sortBy:'amount'}, action);

   expect(state).toEqual({...defaultState, sortBy:'date'});
})

test('should set text filter', () => {
   const action = { type: 'SET_TEXT_FILTER', text:'yabbadabbadoooo!' };
   const state = filtersReducer(defaultState, action);

   expect(state).toEqual({...defaultState, text:'yabbadabbadoooo!'});
})

test('should set startDate filter', () => {
   const action = { type: 'SET_START_DATE', startDate:moment().startOf('year') };
   const state = filtersReducer(defaultState, action);

   expect(state).toEqual({...defaultState, startDate:moment().startOf('year') });
})

test('should set endDate filter', () => {
   const action = { type: 'SET_END_DATE', endDate:moment().startOf('year') };
   const state = filtersReducer(defaultState, action);

   expect(state).toEqual({...defaultState, endDate:moment().startOf('year') });
})