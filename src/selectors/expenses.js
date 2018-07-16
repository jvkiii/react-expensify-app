import moment from 'moment';

export const getFilteredExpenses = (expenses, filters) => { 
	const { text, sortBy, startDate, endDate } = filters;

	const filteredArray = expenses.filter( expense => {
		const createdAtMoment = moment(expense.createdAt);
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	})
	
	const sortedArray = filteredArray.sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		}
		else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	})

	return sortedArray;
}