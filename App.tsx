import React, { useState } from 'react';
import { Proof, ContentData } from './types';
import { createProofStamp } from './services/mockHederaService';
import Header from './components/Header';
import ContentStamper from './components/ContentStamper';
import ProofList from './components/ProofList';
import ProofDetailModal from './components/ProofDetailModal';

const App = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [selectedProof, setSelectedProof] = useState<Proof | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStampContent = async (contentData: ContentData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newProof = createProofStamp(contentData);
      setProofs(prevProofs => [newProof, ...prevProofs]);
    } catch (err) {
      setError('Failed to create proof stamp. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProof = (proof: Proof) => {
    setSelectedProof(proof);
  };

  const handleCloseModal = () => {
    setSelectedProof(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {error && (
            <div className="mb-6 bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <ContentStamper onStamp={handleStampContent} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-7">
            <ProofList proofs={proofs} onSelectProof={handleSelectProof} />
          </div>
        </div>
      </main>
      <ProofDetailModal proof={selectedProof} onClose={handleCloseModal} />
    </div>
  );
};

export default App;