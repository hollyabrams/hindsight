import React, { useState, useEffect } from 'react';

const ProjectRetrospectives = ({ projectId }) => {
  const [retrospectives, setRetrospectives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetrospectives = async () => {
      try {
        const response = await fetch(`/api/retrospective/by-project/${projectId}`);
        const data = await response.json();
        if (response.ok) {
          setRetrospectives(data);
        } else {
          console.error("Failed to fetch retrospectives:", data.errors);
        }
      } catch (error) {
        console.error("There was an error fetching the retrospectives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetrospectives();
  }, [projectId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Retrospectives for Project {projectId}</h2>
      <ul>
        {retrospectives.map(retro => (
          <li key={retro.id}>
            {/* Display retrospective details as needed */}
            <p>Facilitator: {retro.facilitator}</p>
            <p>Start Doing: {retro.start_doing}</p>
            {/* ... other fields ... */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectRetrospectives;
