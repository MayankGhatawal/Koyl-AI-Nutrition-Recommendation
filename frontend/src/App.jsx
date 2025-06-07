import React, { useState } from 'react';
import NutritionForm from './components/NutritionForm';
import OutputDisplay from './components/OutputDisplay';

function App() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-10 mt-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="bg-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">
              Koyl AI Nutritionist
            </h1>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto">
            Get personalized nutrition recommendations powered by AI technology
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
              Enter Your Details
            </h2>
            <NutritionForm 
              setOutput={setOutput} 
              setLoading={setLoading} 
            />
          </section>

          {/* Results Section */}
          <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Nutrition Plan
              </h2>
              <div className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                AI Generated
              </div>
            </div>
            
            <OutputDisplay 
              output={output} 
              loading={loading} 
            />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Koyl AI Nutrition. All recommendations should be reviewed by a medical professional.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;