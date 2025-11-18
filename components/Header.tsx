import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5"></path>
          <path d="M16.5 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"></path>
          <path d="m15 20 2 2 4-4"></path>
          <path d="M9 12h4"></path>
          <path d="M9 16h2"></path>
          <path d="M9 8h4"></path>
        </svg>
        <div>
            <h1 className="text-2xl font-bold text-white">ProofMesh</h1>
            <p className="text-sm text-gray-400">Universal Proof Layer for Digital Content</p>
        </div>
      </div>
    </header>
  );
};

export default Header;