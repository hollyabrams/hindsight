import React from "react";

export default function Navbar() {
  return (
    <header
    className={'bg-gray-800 text-gray-300 fixed top-0 left-0 w-full z-50'}>
      <div className="container mx-auto flex flex-wrap p-7 flex-col md:flex-row items-center">
        <a href="/" className={"title-font font-medium text-white md:mb-0"}>
            Hindsight
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <a href="/login" className="mr-5 hover:text-gray-400">
            Login
          </a>
          <a href="/profile" className="mr-5 hover:text-gray-400">
            Profile
          </a>
          <a href="/dashboard" className="mr-5 hover:text-gray-400">
            Dashboard
          </a>
          <a href="/register" className="mr-5 hover:text-gray-400">
            Register
          </a>
        </nav>
      </div>
    </header>
  );
}
