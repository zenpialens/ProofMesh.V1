import React from 'react';
import { Proof } from '../types';

interface ProofCardProps {
  proof: Proof;
  onSelectProof: (proof: Proof) => void;
}

const TypeIcon = ({ type }: {type: 'image' | 'text'}) => {
    if (type === 'image') {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm2 1h1v1H6V5zm2 0h1v1H8V5zm2 0h1v1h-1V5zm-2 2h1v1H8V7zm2 0h1v1h-1V7zm-2 2h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1z" clipRule="evenodd" /></svg>
}

const ProofCard: React.FC<ProofCardProps> = ({ proof, onSelectProof }) => {
  const creationDate = new Date(proof.provenance[0].timestamp);
  
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-800 transition-colors duration-200">
      <div className="flex-shrink-0">
        {proof.contentType === 'image' ? (
          <img src={proof.contentPreview} alt="Content preview" className="h-16 w-16 rounded-md object-cover bg-gray-700"/>
        ) : (
          <div className="h-16 w-16 rounded-md bg-gray-700 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center text-sm text-gray-400">
            <TypeIcon type={proof.contentType}/>
            <span>By: {proof.creator}</span>
        </div>
        <p className="text-sm text-gray-500 truncate mt-1" title={proof.contentPreview}>
          {proof.contentType === 'text' ? proof.contentPreview : 'Image Content'}
        </p>
         <p className="text-xs text-gray-500 mt-2">
            Stamped: {creationDate.toLocaleString()}
        </p>
      </div>
      <button onClick={() => onSelectProof(proof)} className="ml-4 self-center flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-teal-300 font-bold py-2 px-3 rounded-md text-sm transition-colors">
        Details
      </button>
    </div>
  );
};

export default ProofCard;