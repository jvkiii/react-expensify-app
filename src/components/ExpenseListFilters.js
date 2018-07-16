import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         calendarFocused:null
      }
   }

   onInputChange = e => {
      this.props.dispatch(setTextFilter(e.target.value));
   }

   onSortChange = e => {
      const value = e.target.value;

      if (value === 'date') {
         this.props.dispatch(sortByDate());
      }
      else if (value === 'amount') {
         this.props.dispatch(sortByAmount());
      }
   }
   
   onDatesChange = ({ startDate, endDate }) => {
      this.props.dispatch(setStartDate(startDate));
      this.props.dispatch(setEndDate(endDate));
   }

   onCalendarFocusChange = calendarFocused => {
      this.setState(() => ({ calendarFocused }));
   }

   render() {
      return (
         <div>
            <input 
               type="text" 
               value={this.props.filters.text}
               onChange={this.onInputChange}
            />
            <select 
               name="sort-by" 
               value={this.props.filters.sortBy}
               onChange={this.onSortChange}
            >
               <option value="date">Date</option>
               <option value="amount">Amount</option>
            </select>

            <DateRangePicker
               startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
               startDateId="start-date-picker" // PropTypes.string.isRequired,
               endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
               endDateId="end-date-picker" // PropTypes.string.isRequired,
               onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
               focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
               onFocusChange={this.onCalendarFocusChange} // PropTypes.func.isRequired,
               numberOfMonths={1}
               isOutsideRange={() => false}
               showClearDates={true}
            />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      filters: state.filters
   }
}

export default connect(mapStateToProps)(ExpenseListFilters);