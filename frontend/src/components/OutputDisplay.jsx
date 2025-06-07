// OutputDisplay.js
import React from 'react';

function OutputDisplay({ output, loading }) {
  // Format output with line breaks and styling
  const formatOutput = (text) => {
    if (!text) return '';
    
    return text.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-lg font-semibold text-indigo-700 mt-4 mb-2">{line.substring(3)}</h3>;
      } else if (line.startsWith('# ')) {
        return <h2 key={index} className="text-xl font-bold text-indigo-800 mt-6 mb-3">{line.substring(2)}</h2>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-3 leading-relaxed">{line}</p>;
      }
    });
  };

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Analyzing your profile...</p>
          <p className="text-sm text-gray-500">Generating personalized recommendations</p>
        </div>
      ) : output ? (
        <div className="prose max-w-none">
          <div className="p-4 bg-indigo-50 rounded-lg mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-indigo-800">AI-Powered Nutrition Plan</span>
            </div>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap">
            {formatOutput(output)}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center p-4">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your Nutrition Plan Awaits</h3>
          <p className="text-gray-600 max-w-md">
            Enter your symptoms and allergies to receive personalized AI-generated nutrition recommendations.
          </p>
        </div>
      )}
    </div>
  )
}

export default OutputDisplay;