import React from 'react';

// This is just sample data. In a real app, this data will likely come from an API.
const feedbacks = [
  {
    id: 1,
    user: "User1",
    text: "The new design looks great!",
    tags: ["design", "positive"]
  },
  {
    id: 2,
    user: "User2",
    text: "We need to improve our testing strategy.",
    tags: ["testing", "improvement"]
  },
  {
    id: 3,
    user: "User3",
    text: "Drop the dailies and make weeklies instead.",
    tags: ["meetings", "collaboration", "stop doing"]
  },
  {
    id: 4,
    user: "User4",
    text: "Focusing on follow through after our retrospectives. It's helping us improve as a team.",
    tags: ["positive", "improvement", "keep doing"]
  },
  // Add more feedback items as needed.
];

export default function Feed() {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="font-medium text-2xl mb-4 text-gray-500">
        Retrospective Feed
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mb-5">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="border border-gray-200 p-4 rounded" style={{
            backgroundColor: '#fffc94', // post-it note yellow
            boxShadow: '5px 5px 15px rgba(0,0,0,0.1)', // soft shadow
            transform: 'rotate(0deg)', // slight rotation
            padding: '20px',
            position: 'relative',
            minHeight: '10rem',
            fontFamily: 'Permanent Marker, cursive',
            fontSize: '20px',
            lineHeight: '25px',
        }}
        >
            <h2 className="font-medium text-lg text-gray-500">{feedback.user}:</h2>
            <p className="text-gray-500">{feedback.text}</p>
            <div className="mt-4 space-x-4">
              {feedback.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-indigo-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


