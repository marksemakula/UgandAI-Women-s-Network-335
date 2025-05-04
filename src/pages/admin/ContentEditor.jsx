import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiSave, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ContentEditor() {
  const { section } = useParams();
  const [content, setContent] = useState({
    title: '',
    description: '',
    image: '',
    published: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save content logic here
    console.log('Content saved:', content);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">
        {section.charAt(0).toUpperCase() + section.slice(1)} Editor
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={content.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={content.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={content.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="published"
            checked={content.published}
            onChange={handleChange}
            className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Published</label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"
          >
            <FiTrash2 className="inline mr-2" />
            Delete
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition"
          >
            <FiSave className="inline mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}