import React from 'react';

const ProjectCard = ({ project }) => {
  console.log('ProjectCard props:', project);

  return (
      <div className="ProjectCard">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>{project.status}</p>
      </div>
  );
};


export default ProjectCard;
