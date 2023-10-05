import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HindsightApi from '../api';
import QRCode from 'qrcode.react';
import Typed from 'typed.js';

export default function RetrospectivePage() {
    const [data, setData] = useState({
        keepDoing: [],
        stopDoing: [],
        continueDoing: [],
        actionItems: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const options = {
          strings: ['What went well?', 'What can we do better?', 'How can we improve?', 'What did you learn?'],
          typeSpeed: 50,
          backSpeed: 40,
          loop: true,
          loopCount: Infinity,
          startDelay: 1000,
        };
      
        const typed = new Typed('#questions', options);
      
        // Destroy Typed instance on unmounting to prevent memory leaks
        return () => {
          typed.destroy();
        };
      }, []);

    // useEffect(() => {
    //     async function fetchData() {
    //         setIsLoading(true);
    //         const retrospectiveData = await HindsightApi.getRetrospectivesByProject(); 
    //         setData(retrospectiveData);
    //         setIsLoading(false);
    //     }
    //     fetchData();
    // }, []);

    // if (isLoading) {
    //     return 'Loading...';
    // }

    return (
        <section className="text-gray-400 bg-gray-900 body-font h-screen relative">
            <div className="container px-5 py-16 mx-auto h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="md:mt-0 mb-4 sm:text-5xl text-2xl font-medium title-font text-white">
                            Retrospective
                        </h1>
                        <span id="questions" className="md:mt-0 sm:text-4xl text-xl text-green-500">
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/start-retrospective">
                            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                Open Form
                            </button>
                        </Link>
                        <QRCode value="https://your-url-to-the-form.com" size={128} />
                    </div>
                </div>

                <div className="h-full grid gap-6 grid-cols-2">
                    {["keepDoing", "stopDoing", "continueDoing", "actionItems"].map((quadrant, index) => (
                        <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col">
                            <h2 className="text-lg text-white font-semibold mb-4 capitalize">{quadrant.replace(/([A-Z])/g, ' $1')}</h2>
                            <ul className="flex-1 overflow-y-auto">
                                {data[quadrant].map(item => (
                                    <li key={item.id} className="text-gray-300 mb-2">{item.content}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {/* Lessons Learned Section */}
                <div className="mt-8">
                    <h2 className="text-lg text-white font-semibold mb-4">Lessons Learned</h2>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <ul>
                            {data.lessonsLearned && data.lessonsLearned.map(lesson => (
                                <li key={lesson.id} className="text-gray-300 mb-2 border-b border-gray-700 pb-2">{lesson.content}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
