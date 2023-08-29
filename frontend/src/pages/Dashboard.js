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
                
                console.log("Projects: ", proj);
                console.log("Retrospectives: ", retro);

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
        <div className="bg-gray-300 border border-gray-500 p-6 flex justify-center mt-10 rounded ml-8 mr-8">
            {/* User Summary */}
            <section className="w-1/4 bg-white p-4 rounded mr-4">
                <h1 className="text-3xl font-bold mb-4 text-gray-700">Dashboard</h1>
                <h2 className="text-2xl font-semibold mb-2 text-gray-500">User Summary</h2>
                <p className="mb-1">Total Projects: {projects.length}</p>
                <p className="mb-1">Total Retrospectives: {retrospectives.length}</p>
                <p>Total Action Items: {actionItems.length}</p>
                {/* Buttons to Add Project and Start Retrospective */}
                <div className="mt-4">
                    <Link to="/add-project">
                        <button className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add a Project</button>
                    </Link>
                    <Link to="/start-retrospective" className="ml-4">
                        <button className="btn bg-green-500 text-white p-2 rounded hover:bg-green-600">Start a Retrospective</button>
                    </Link>
                </div>
            </section>

            {/* Right Side Content */}
            <div className="w-11/20 overflow-scroll h-full">
                {/* Projects Overview */}
                <section className="mb-6 bg-white p-4 rounded">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Projects Overview</h2>
                    {/* Replace this with a ProjectCard component or similar that shows more detail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map(project => <ProjectCard key={project.id} project={project} />)}
                    </div>
                </section>
                
                {/* Latest Retrospectives */}
                <section className="mb-6 bg-white p-4 rounded">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Latest Retrospectives</h2>
                    {/* Replace this with a RetrospectiveCard component or similar that shows more detail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {retrospectives.map(retrospective => <RetrospectiveCard key={retrospective.id} retrospective={retrospective} />)}
                    </div>
                </section>
                
                {/* Pending Action Items */}
                <section className="mb-6 bg-white p-4 rounded">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700">Pending Action Items</h2>
                    {/* Replace this with an ActionItemCard component or similar that shows more detail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {actionItems.map(item => <ActionItemCard key={item.id} actionItem={item} />)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;


