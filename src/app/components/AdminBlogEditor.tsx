import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { indianStatesData, koreanProvincesData, StateData } from '../data/statesData';

// This function is now shared between the detail page and the editor
const generateBlogContent = (state: StateData): string => {
  const attractionsHtml = state.places.length > 0 ? `
    <h2>🏰 Major Tourist Attractions</h2>
    <p>Discover the most iconic landmarks and hidden gems in ${state.name}.</p>
    <ul>
      ${state.places.map(place => `<li><strong>${place.name}:</strong> ${place.description}</li>`).join('')}
    </ul>
  ` : '';

  const foodHtml = state.food.length > 0 ? `
    <hr />
    <h2>🍛 Food & Cuisine</h2>
    <p>The local cuisine is a delightful experience. Here are some must-try dishes:</p>
    <ul>
      ${state.food.map(dish => `<li><strong>${dish.name} (${dish.type}):</strong> ${dish.description}</li>`).join('')}
    </ul>
  ` : '';

  const cultureHtml = state.culturalNorms.length > 0 ? `
    <hr />
    <h2>🎭 Culture & Norms</h2>
    <blockquote>${state.name} has a rich and vibrant culture. Understanding the local customs will make your trip more enjoyable.</blockquote>
    <ul>
      ${state.culturalNorms.map(norm => `<li>${norm}</li>`).join('')}
    </ul>
  ` : '';

  return `${attractionsHtml}${foodHtml}${cultureHtml}`;
};

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

// Custom CSS to increase editor height and match project theme
const editorStyle = `
  .ql-toolbar {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-color: #e5e7eb; /* gray-200 */
    background-color: #f9fafb; /* gray-50 */
  }
  .ql-container {
    height: 650px;
    font-size: 1rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-color: #e5e7eb; /* gray-200 */
  }
  .quill:focus-within .ql-container {
    border-color: #f97316 !important; /* orange-500 */
    box-shadow: 0 0 0 1px #f97316; /* orange-500 */
  }
  .quill:focus-within .ql-toolbar {
    border-color: #f97316 !important; /* orange-500 */
    box-shadow: 0 0 0 1px #f97316; /* orange-500 */
  }
`;

export function AdminBlogEditor() {
  const { region, stateId } = useParams<{ region: string; stateId: string }>();
  const [content, setContent] = useState('');
  const [stateName, setStateName] = useState('');

  useEffect(() => {
    const data = region === 'india' ? indianStatesData : koreanProvincesData;
    const state = data.find(s => s.id === stateId);
    if (state) {
      setStateName(state.name);
      const initialContent = state.blogContent || generateBlogContent(state);
      setContent(initialContent);
    }
  }, [region, stateId]);

  const handleSave = () => {
    console.log("Saving data for", stateId, ":", content);
    alert("Blog data saved! Check the console for the HTML output.");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <style>{editorStyle}</style>
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Editor</h1>
          <p className="text-gray-600">Editing content for: {stateName}</p>
        </div>
      </div>
      
      <div className="quill">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-green-700 shadow-sm"
        >
          Save Blog Content
        </button>
      </div>
    </div>
  );
}
