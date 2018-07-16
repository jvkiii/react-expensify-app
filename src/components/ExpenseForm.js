import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';


export default class ExpenseForm extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         description: props.expense ? props.expense.description : '',
         note: props.expense ? props.expense.note : '',
         amount: props.expense ? String(props.expense.amount / 100) : '',
         createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
         calendarFocused: false,
         error:''
      }
   }

   onDescriptionChange = (e) => {
      const description = e.target.value;

      this.setState(() => ({
         description:description
      }))
   }

   onNoteChange = (e) => {
      const note = e.target.value;

      this.setState(() => ({
         note:note
      }))
   }

   onAmountChange = (e) => {
      const amount = e.target.value;

      //validate format: 1234.12
      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
         this.setState(() => ({
            amount:amount
         }))
      }
   }

   onFormSubmit = e => {
      e.preventDefault();

      if (!this.state.description || !this.state.amount) {
         this.setState(() => ({
            error: 'Please enter a description and amount'
         }))
      } else {
         this.setState(() => ({
            error: ''
         }))
      }

      //send action
      this.props.onFormSubmit({
         description:this.state.description,
         amount:Number(this.state.amount) * 100, //in cents
         note:this.state.note,
         createdAt:this.state.createdAt.valueOf()
      })

      //clear fields
      this.setState(() => ({
         description: '',
         amount:'',
         note:'',
         createdAt: moment()
      }))
   }

   //-- date picker handlers --/

   onDateChange = createdAt => {
      if (createdAt) {
         this.setState(() => ({ createdAt }))
      }
   }

   onCalendarFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }))
   }

   //-- lifecycle methods --//

   render() {
      return (
         <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onFormSubmit}>
               <input 
                  type="text"
                  placeholder="Description"
                  autoFocus
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
               />
               <input 
                  type="text"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.onAmountChange}
               />
               <SingleDatePicker
                  id="expense-date-picker" // PropTypes.string.isRequired,
                  date={this.state.createdAt} // momentPropTypes.momentObj or null
                  onDateChange={this.onDateChange} // PropTypes.func.isRequired
                  focused={this.state.calendarFocused} // PropTypes.bool
                  onFocusChange={this.onCalendarFocusChange} // PropTypes.func.isRequired
                  numberOfMonths={1}
                  isOutsideRange={(day) => false}
               />
               <textarea 
                  name=""
                  placeholder="Add a note for your expense (optional)"
                  value={this.state.note}
                  onChange={this.onNoteChange}
               ></textarea>
               <button>Add Expense</button>
            </form>
         </div>
      )
   }
}