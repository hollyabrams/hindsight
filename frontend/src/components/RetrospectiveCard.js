import React from 'react';

const RetrospectiveCard = ({retrospective}) => {
  return (
    <div className="RetrospectiveCard">
      <h3>{retrospective.name}</h3>
      <p>Project: {retrospective.project}</p>
      <p>Date: {retrospective.date}</p>
      <p>Number of Action Items: {retrospective.actionItems.length}</p>
    </div>
  )
}

export default RetrospectiveCard;
