// Homepage Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="font-sans min-h-screen flex flex-col">
    <Navbar />
    <main className="pt-20 overflow-x-hidden relative w-full max-w-full text-gray-400 body-font flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
