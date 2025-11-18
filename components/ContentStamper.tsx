import React, { useState } from 'react';
import { ContentData } from '../types';
import { fileToBase64 } from '../utils/helpers';
import { generateText } from '../services/geminiService';
import Spinner from './Spinner';

interface ContentStamperProps {
  onStamp: (contentData: ContentData) => void;
  isLoading: boolean;
}

type ActiveTab = 'upload' | 'generate';

const ContentStamper = ({ onStamp, isLoading }: ContentStamperProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('upload');
  
  // Shared state
  const [creator, setCreator] = useState('');
  const [creatorError, setCreatorError] = useState<string | null>(null);
  
  // Upload tab state
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [textFilePreview, setTextFilePreview] = useState<string | null>(null);


  // Generate tab state
  const [prompt, setPrompt] = useState('');
  const [aiModel] = useState('Gemini 2.5 Flash');
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(null);
      setTextFilePreview(null);

      if (selectedFile.type.startsWith('image/')) {
        const base64 = await fileToBase64(selectedFile);
        setFilePreview(base64);
      } else if (selectedFile.type === 'text/plain') {
        const textContent = await selectedFile.text();
        setTextFilePreview(textContent);
      }
    }
  };

  const handleGenerateText = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedText(null);
    try {
      const result = await generateText(prompt);
      setGeneratedText(result);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during text generation.';
        setGenerationError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creator.trim()) {
      setCreatorError('Creator name is required.');
      return;
    }
    setCreatorError(null);

    let contentData: ContentData | null = null;

    if (activeTab === 'upload' && file) {
      if (file.type.startsWith('image/') && filePreview) {
        contentData = {
          creator,
          contentType: 'image',
          content: filePreview,
        };
      } else if (file.type === 'text/plain' && textFilePreview) {
        contentData = {
          creator,
          contentType: 'text',
          content: textFilePreview,
        };
      }
    } else if (activeTab === 'generate' && generatedText) {
      contentData = {
        creator,
        contentType: 'text',
        content: generatedText,
        aiModel,
        prompt,
      };
    }

    if (contentData) {
      onStamp(contentData);
      // Reset form fields after submission for better UX
      setCreator('');
      setFile(null);
      setFilePreview(null);
      setTextFilePreview(null);
      setPrompt('');
      setGeneratedText(null);
      setGenerationError(null);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-white mb-4">Stamp New Content</h2>
        
        <div className="flex border-b border-gray-700 mb-4">
            <button type="button" onClick={() => setActiveTab('upload')} className={`py-2 px-4 font-medium text-sm transition-colors ${activeTab === 'upload' ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400 hover:text-white'}`}>
                Upload Content
            </button>
            <button type="button" onClick={() => setActiveTab('generate')} className={`py-2 px-4 font-medium text-sm transition-colors ${activeTab === 'generate' ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400 hover:text-white'}`}>
                Generate with AI
            </button>
        </div>

        <div className="mb-4">
            <label htmlFor="creator" className="block text-sm font-medium text-gray-300 mb-1">Creator Name</label>
            <input
                type="text"
                id="creator"
                value={creator}
                onChange={(e) => {
                    setCreator(e.target.value);
                    if (e.target.value.trim()) setCreatorError(null);
                }}
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Jane Doe"
            />
             {creatorError && <p className="mt-1 text-sm text-red-400" role="alert">{creatorError}</p>}
        </div>
        
        {activeTab === 'upload' && (
            <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-1">Upload File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-teal-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.txt" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF, or TXT</p>
                    </div>
                </div>
                {(filePreview || textFilePreview) && file && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-300">Preview:</p>
                        <div className="mt-2 p-2 border border-gray-700 rounded-md bg-gray-900">
                            {filePreview && <img src={filePreview} alt="Preview" className="max-h-48 rounded-md mx-auto" />}
                            {textFilePreview && <p className="text-sm text-gray-300 whitespace-pre-wrap max-h-48 overflow-y-auto">{textFilePreview}</p>}
                        </div>
                    </div>
                )}
            </div>
        )}

        {activeTab === 'generate' && (
            <div>
                <div className="mb-4">
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">AI Prompt</label>
                    <textarea id="prompt" rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="A short story about a robot exploring Mars"></textarea>
                </div>
                <button type="button" onClick={handleGenerateText} disabled={isGenerating || !prompt.trim()} className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-indigo-800 disabled:cursor-not-allowed">
                    {isGenerating ? <Spinner /> : 'Generate Text'}
                </button>
                 {generationError && (
                    <div className="mt-3 text-sm text-red-400 p-3 bg-red-900/50 border border-red-800 rounded-md" role="alert">
                        <p className="font-bold">Generation Failed</p>
                        <p>{generationError}</p>
                    </div>
                )}
                {generatedText && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-300">Generated Text:</p>
                        <div className="mt-2 p-3 border border-gray-700 rounded-md bg-gray-900 max-h-48 overflow-y-auto">
                            <p className="text-sm text-gray-300 whitespace-pre-wrap">{generatedText}</p>
                        </div>
                    </div>
                )}
            </div>
        )}

        <div className="mt-6">
            <button type="submit" disabled={isLoading || (activeTab === 'upload' && !file) || (activeTab === 'generate' && !generatedText) || !creator} className="w-full flex justify-center items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:bg-teal-800 disabled:cursor-not-allowed">
                {isLoading ? <Spinner /> : 'Create Proof Stamp'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ContentStamper;