import React, { useEffect } from 'react';
import { Proof } from '../types';

interface ProofDetailModalProps {
  proof: Proof | null;
  onClose: () => void;
}

const DetailRow = ({ label, value, isHash }: { label: string; value?: string; isHash?: boolean }) => {
    if (!value) return null;
    return (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-400">{label}</dt>
            <dd className={`mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2 ${isHash ? 'font-mono break-all' : ''}`}>{value}</dd>
        </div>
    );
};

const ProofDetailModal = ({ proof, onClose }: ProofDetailModalProps) => {
  useEffect(() => {
    if (!proof) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, proof]);

  if (!proof) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="proof-detail-title"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-800 px-4 py-4 sm:px-6 border-b border-gray-700 flex justify-between items-center">
            <h3 id="proof-detail-title" className="text-lg leading-6 font-medium text-white">Proof Details</h3>
            <button 
                onClick={onClose} 
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Close"
            >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-48 h-48">
                {proof.contentType === 'image' ? (
                    <img src={proof.originalContent} alt="Content" className="w-full h-full rounded-md object-contain bg-gray-900"/>
                ) : (
                    <div className="w-full h-full rounded-md bg-gray-900 p-3 overflow-y-auto">
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{proof.originalContent}</p>
                    </div>
                )}
                </div>
                <div className="flex-1">
                     <dl className="divide-y divide-gray-700">
                        <DetailRow label="Creator" value={proof.creator} />
                        <DetailRow label="AI Model" value={proof.aiModel} />
                        <DetailRow label="Content Hash" value={proof.contentHash} isHash />
                        <DetailRow label="IPFS CID" value={proof.ipfsCid} isHash />
                    </dl>
                </div>
            </div>
            
            {proof.prompt && (
                 <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-300 mb-2">AI Prompt</h4>
                    <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{proof.prompt}</p>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <h4 className="text-md font-medium text-gray-300 mb-2">Provenance Chain</h4>
                <div className="flow-root">
                    <ul className="-mb-8">
                        {proof.provenance.map((event, eventIdx) => (
                        <li key={event.hederaTxId}>
                            <div className="relative pb-8">
                            {eventIdx !== proof.provenance.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                <span className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center ring-8 ring-gray-800">
                                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between flex-wrap">
                                    <div>
                                        <p className="text-sm text-gray-300">{event.details}</p>
                                        <p className="text-sm font-mono text-teal-400 mt-1 break-all">TxID: {event.hederaTxId}</p>
                                    </div>
                                    <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                        <time dateTime={event.timestamp}>{new Date(event.timestamp).toLocaleString()}</time>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProofDetailModal;