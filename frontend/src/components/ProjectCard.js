import React from 'react';

const ProjectCard = ({project}) => {
  return (
    <div className="ProjectCard">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Team Members: {project.teamMembers.length}</p>
      <p>Number of Retrospectives: {project.retrospectives.length}</p>
      <p>Number of Action Items: {project.actionItems.length}</p>
    </div>
  )
}

export default ProjectCard;
