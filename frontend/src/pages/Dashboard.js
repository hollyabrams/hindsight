import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HindsightApi from '../api';
import UserContext from '../UserContext';
import ProjectCard from '../components/ProjectCard';
import RetrospectiveCard from '../components/RetrospectiveCard';
import ActionItemCard from '../components/ActionItemCard';

const Dashboard = () => {
    const { currentUser } = useContext(UserContext);
    const [projects, setProjects] = useState([]);
    const [retrospectives, setRetrospectives] = useState([]);
    const [actionItems, setActionItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const proj = await HindsightApi.getProjects(currentUser.username); 
                const retro = await HindsightApi.getRetrospectives(currentUser.username); 

                const action = retro.flatMap(r => r.actionItems);
                setProjects(proj);
                setRetrospectives(retro);
                setActionItems(action);
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
            setIsLoading(false);
        };

        if (currentUser) { 
            fetchData();
        }
    }, [currentUser]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <div>Please log in to view the dashboard.</div>;
    }

    return (
        <div className="h-screen flex bg-gray-100">
          {/* Sidebar */}
          <div className="bg-white w-64 p-4">
            <nav>
              <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Home</Link>
              <Link to="/projects" className="block py-2 px-4 hover:bg-gray-200">Projects</Link>
              <Link to="/profile" className="block py-2 px-4 hover:bg-gray-200">Profile Settings</Link>
            </nav>
          </div>
    
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-8">
              <h2 className="text-xl font-semibold">Welcome Back, {currentUser.firstName}!</h2>
              <div className="space-x-4">
                  <Link to="/add-project">
                    <button className="btn bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600">Add a Project</button>
                  </Link>
                  <Link to="/retrospectives">
                    <button className="btn bg-green-500 text-white p-2 rounded hover:bg-green-600">Start a Retrospective</button>
                  </Link>
              </div>
            </div>
    
            {/* Dashboard Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Single Widget */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Total Projects</h3>
                {projects.map(project => <ProjectCard key={project.id} project={project} />)}
                <p className="text-3xl font-bold">{projects.length}</p>
              </div>
    
              {/* Single Widget */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Total Retrospectives</h3>
                {retrospectives.map(retrospective => <RetrospectiveCard key={retrospective.id} retrospective={retrospective} />)}
                <p className="text-3xl font-bold">{retrospectives.length}</p>
              </div>
    
              {/* Single Widget */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Total Action Items</h3>
                {actionItems.map(item => <ActionItemCard key={item.id} actionItem={item} />)}
                <p className="text-3xl font-bold">{actionItems.length}</p>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Dashboard;



