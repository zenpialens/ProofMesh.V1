export interface ProvenanceEvent {
  timestamp: string;
  action: 'CREATED' | 'EDITED';
  details: string;
  hederaTxId: string;
}

export type ContentType = 'image' | 'text';

export interface Proof {
  id: string;
  contentHash: string;
  ipfsCid: string;
  creator: string;
  aiModel?: string;
  prompt?: string;
  contentType: ContentType;
  contentPreview: string; // Base64 for image, snippet for text
  originalContent: string; // Full text content or base64 image
  provenance: ProvenanceEvent[];
}

export interface ContentData {
    creator: string;
    aiModel?: string;
    prompt?: string;
    contentType: ContentType;
    content: string; // Full text content or base64 image data string
}