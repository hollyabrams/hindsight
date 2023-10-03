import React, { useEffect, useState } from 'react';
import HindsightApi from '../api';

export default function ProjectPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            setIsLoading(true);
            const fetchedProjects = await HindsightApi.getAllProjects();
            setProjects(fetchedProjects);
            setIsLoading(false);
        }
        fetchProjects();
    }, []);

    if (isLoading) {
        return 'Loading...'; // add a loading state
    }

    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-16 mx-auto">
                <h1 className="md:mt-0 sm:text-5xl text-2xl font-medium title-font mb-2 text-white">
                    Projects
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                <div className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="p-6 bg-gray-800 rounded-lg shadow-md"
                        >
                            <h2 className="text-lg text-white font-semibold mb-2">
                                {project.title}
                            </h2>
                            <p className="text-gray-300">{project.description}</p>
                            <p className="text-green-500 mt-2">Status: {project.status}</p>
                            <p className="text-yellow-500 mt-1">Deadline: {project.deadline}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}




