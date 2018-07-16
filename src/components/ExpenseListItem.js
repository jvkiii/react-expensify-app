import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id}) => (
   <li>
      <Link to={`/edit/${id}`}>
         <strong>{description}</strong>
      </Link>
      <p>Amount: {amount}, Created: {createdAt}</p>
   </li>
);

export default ExpenseListItem;