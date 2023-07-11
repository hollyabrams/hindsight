import React from 'react';
import Clock from '../components/Clock';
import Feed from '../components/Feed';

function Home() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="md:mt-0 sm:text-5xl text-2xl font-medium title-font mb-2 text-white">
              Hindsight
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            <h2 className="sm:text-2xl text-1xl leading-relaxed text-base mt-4">
                Looking back to improve the future.
            </h2>
          </div>
          <div className="lg:w-1/2 w-full px-3 mt-10 lg:mt-0">
              <p className="leading-relaxed text-base">
                  Hindsight is a retrospective app that helps teams reflect on their 
                  projects, understand what went well, and identify areas for improvement. 
                  The app facilitates live feedback, tagging, and efficient decision-making 
                  for continuous improvement.
              </p>
              <div className="flex justify-start mt-10">
                  <a 
                      href="/login"
                      className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mr-4">
                      Login
                  </a>
                  <a 
                      href="/register"
                      className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                      Register
                  </a>
              </div>
          </div>
        </div>
        
        {/* <div className="lg:flex lg:justify-center lg:items-center flex-col lg:flex-row">
          <div className="xl:w-1/5 md:w-2/5 p-3 mr-5 lg:mb-0">
              <div className="bg-gray-800 p-6 rounded-lg flex justify-center items-center">
                  <Clock />
              </div>
          </div>
        </div> */}
      </div>
      <div className='bg-white'>
          <Feed />
      </div>
    </section>
  );
}

export default Home;
