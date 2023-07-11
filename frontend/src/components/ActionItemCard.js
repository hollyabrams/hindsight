import React from 'react';

const ActionItemCard = ({actionItem}) => {
  return (
    <div className="ActionItemCard">
      <h3>{actionItem.name}</h3>
      <p>Description: {actionItem.description}</p>
      <p>Project: {actionItem.project}</p>
      <p>Due Date: {actionItem.dueDate}</p>
      <p>Status: {actionItem.status}</p>
    </div>
  )
}

export default ActionItemCard;
