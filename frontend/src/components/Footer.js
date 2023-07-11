import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 flex flex-col items-center space-y-4 pb-4">
      <div className="flex justify-center items-center space-x-8 mt-5">
        <a href="https://github.com/hollyabrams" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-10 h-10 text-gray-400 hover:text-gray-600" />
        </a>
        <a href="mailto:holly.d.abrams@gmail.com" target="_blank" rel="noopener noreferrer">
          <FiMail className="w-10 h-10 text-gray-400 hover:text-gray-600" />
        </a>
        <a href="https://www.linkedin.com/in/hollyabrams/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-10 h-10 text-gray-400 hover:text-gray-600" />
        </a>
      </div>
    </footer>
  );
}