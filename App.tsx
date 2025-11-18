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