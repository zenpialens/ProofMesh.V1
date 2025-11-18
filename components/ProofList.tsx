import React from 'react';
import { Proof } from '../types';
import ProofCard from './ProofCard';

interface ProofListProps {
  proofs: Proof[];
  onSelectProof: (proof: Proof) => void;
}

const ProofList = ({ proofs, onSelectProof }: ProofListProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg h-full">
      <h2 className="text-xl font-semibold text-white mb-4">Content Provenance Ledger</h2>
      {proofs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">No proofs stamped yet.</p>
            <p className="text-sm">Use the form to create your first proof.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {proofs.map((proof) => (
            <ProofCard key={proof.id} proof={proof} onSelectProof={onSelectProof} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProofList;