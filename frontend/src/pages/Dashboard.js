import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import RetrospectiveCard from '../components/RetrospectiveCard';
import ActionItemCard from '../components/ActionItemCard';

const Dashboard = () => {
    const mockProjects = [
        { 
            id: 1, 
            name: "Project 1", 
            description: "Description for Project 1",
            teamMembers: ['Member1', 'Member2'],
            retrospectives: ['Retrospective1', 'Retrospective2'],
            actionItems: ['Action Item 1', 'Action Item 2']
        },
        { 
            id: 2, 
            name: "Project 2", 
            description: "Description for Project 2",
            teamMembers: ['Member3', 'Member4'],
            retrospectives: ['Retrospective3', 'Retrospective4'],
            actionItems: ['Action Item 3', 'Action Item 4']
        },
    ];

    const mockRetrospectives = [
        { 
            id: 1, 
            name: "Retrospective 1", 
            project: "Project 1",
            date: "2023-07-12",
            actionItems: ['Action Item 1', 'Action Item 2']
        },
        { 
            id: 2, 
            name: "Retrospective 2", 
            project: "Project 2",
            date: "2023-07-13",
            actionItems: ['Action Item 3', 'Action Item 4']
        },
    ];

    const mockActionItems = [
        { 
            id: 1, 
            name: "Action Item 1", 
            description: "Description for Action Item 1",
            project: "Project 1",
            dueDate: "2023-07-20",
            status: "In Progress"
        },
        { 
            id: 2, 
            name: "Action Item 2", 
            description: "Description for Action Item 2",
            project: "Project 2",
            dueDate: "2023-07-25",
            status: "Completed"
        },
    ];

    const [projects, setProjects] = useState(mockProjects);
    const [retrospectives, setRetrospectives] = useState(mockRetrospectives);
    const [actionItems, setActionItems] = useState(mockActionItems);

    useEffect(() => {
        // Here you'll fetch data from your API when it's set up
    }, []);

    return (
        <div className="bg-gray-300 border border-gray-500 p-6 flex justify-center mt-10 rounded ml-8 mr-8">
            {/* User Summary */}
            <section className="w-1/4 bg-white p-4 rounded mr-4">
                <h1 className="text-3xl font-bold mb-4 text-gray-700">Dashboard</h1>
                <h2 className="text-2xl font-semibold mb-2 text-gray-500">User Summary</h2>
                <p className="mb-1">Total Projects: {projects.length}</p>
                <p className="mb-1">Total Retrospectives: {retrospectives.length}</p>
                <p>Total Action Items: {actionItems.length}</p>
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


