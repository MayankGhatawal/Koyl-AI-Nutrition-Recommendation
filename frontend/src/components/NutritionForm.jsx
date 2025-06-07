// NutritionForm.js
import React, { useState } from 'react';

function NutritionForm({ setOutput, setLoading }) {
  const [symptoms, setSymptoms] = useState('');
  const [allergies, setAllergies] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, allergies })
      });
      const data = await res.json();
      setOutput(data.summary);
    } catch (error) {
      setOutput('Error: Could not connect to the server. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Symptoms or Health Concerns
        </label>
        <textarea 
          placeholder="e.g. Fatigue, digestive issues, weight management..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          rows={4}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500">
          Describe any symptoms or health goals you have
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Food Allergies or Restrictions
        </label>
        <textarea 
          placeholder="e.g. Dairy, gluten, nuts..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          rows={3}
          onChange={(e) => setAllergies(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          List any food allergies, intolerances, or dietary preferences
        </p>
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Nutrition Plan
      </button>
    </form>
  )
}

export default NutritionForm;