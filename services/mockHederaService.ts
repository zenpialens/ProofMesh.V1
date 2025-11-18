import { Proof, ContentData, ProvenanceEvent, ContentType } from '../types';

// Helper to generate a random hash-like string
const generateRandomHash = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Mock function to create a proof stamp
export const createProofStamp = (contentData: ContentData): Proof => {
  const timestamp = new Date();
  const contentHash = `0x${generateRandomHash(64)}`;
  const ipfsCid = `Qm${generateRandomHash(44)}`;
  const hederaTxId = `0.0.12345@${Math.floor(timestamp.getTime() / 1000)}`;

  const provenanceEvent: ProvenanceEvent = {
    timestamp: timestamp.toISOString(),
    action: 'CREATED',
    details: `Initial content registration by ${contentData.creator}.`,
    hederaTxId: hederaTxId,
  };

  let contentPreview = '';
  if(contentData.contentType === 'text') {
      contentPreview = contentData.content.substring(0, 150) + (contentData.content.length > 150 ? '...' : '');
  } else {
      contentPreview = contentData.content;
  }

  const newProof: Proof = {
    id: hederaTxId,
    contentHash,
    ipfsCid,
    creator: contentData.creator,
    aiModel: contentData.aiModel,
    prompt: contentData.prompt,
    contentType: contentData.contentType,
    contentPreview: contentPreview,
    originalContent: contentData.content,
    provenance: [provenanceEvent],
  };

  return newProof;
};