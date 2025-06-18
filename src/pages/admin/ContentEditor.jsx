import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiSave, FiTrash2, FiEdit, FiExternalLink, FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ContentEditor() {
  const { section } = useParams();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'Training',
    googleFormLink: '',
    formResponsesLink: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
    setEvents(savedEvents);
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent(prev => ({ ...prev, [name]: value }));
  };

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem('uwiai_events', JSON.stringify(updatedEvents));
    toast.success('Events saved successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentEvent.googleFormLink.includes('docs.google.com/forms')) {
      toast.error('Please enter a valid Google Form link');
      return;
    }

    let updatedEvents;
    
    if (isEditing) {
      updatedEvents = events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      );
    } else {
      updatedEvents = [...events, { 
        ...currentEvent, 
        id: Date.now().toString(),
        formResponsesLink: currentEvent.formResponsesLink || 
          currentEvent.googleFormLink.replace('/viewform', '/viewanalytics')
      }];
    }
    
    saveEvents(updatedEvents);
    resetForm();
  };

  const resetForm = () => {
    setCurrentEvent({
      id: '',
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'Training',
      googleFormLink: '',
      formResponsesLink: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveEvents(updatedEvents);
    toast.info('Event deleted');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  if (section !== 'events') {
    return (
      <div className="p-8">
        {/* ... existing content editor for other sections ... */}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Events Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? 'Edit Event' : 'Add New Event'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title*</label>
              <input
                type="text"
                name="title"
                value={currentEvent.title}
                onChange={handleEventChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                <input
                  type="date"
                  name="date"
                  value={currentEvent.date}
                  onChange={handleEventChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                <input
                  type="time"
                  name="time"
                  value={currentEvent.time}
                  onChange={handleEventChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
              <input
                type="text"
                name="location"
                value={currentEvent.location}
                onChange={handleEventChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type*</label>
              <select
                name="type"
                value={currentEvent.type}
                onChange={handleEventChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
              >
                <option value="Training">Training</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Networking">Networking</option>
                <option value="Ceremony">Ceremony</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={currentEvent.description}
                onChange={handleEventChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Form Link*
                <span className="text-xs text-gray-500 ml-1">(Registration form)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="googleFormLink"
                  value={currentEvent.googleFormLink}
                  onChange={handleEventChange}
                  required
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent pr-10"
                />
                {currentEvent.googleFormLink && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentEvent.googleFormLink)}
                      className="text-gray-500 hover:text-accent"
                      title="Copy link"
                    >
                      <FiCopy className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responses Link
                <span className="text-xs text-gray-500 ml-1">(View responses)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="formResponsesLink"
                  value={currentEvent.formResponsesLink}
                  onChange={handleEventChange}
                  placeholder="https://docs.google.com/forms/d/e/.../viewanalytics"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent pr-10"
                />
                {currentEvent.formResponsesLink && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
                    <a 
                      href={currentEvent.formResponsesLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-accent"
                      title="Open in new tab"
                    >
                      <FiExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentEvent.formResponsesLink)}
                      className="text-gray-500 hover:text-accent"
                      title="Copy link"
                    >
                      <FiCopy className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                {isEditing ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Current Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-500">No events added yet</p>
          ) : (
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-600">
                        {event.type} • {event.date} • {event.time}
                      </p>
                      <div className="mt-1 flex space-x-2">
                        <a
                          href={event.googleFormLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:underline flex items-center"
                        >
                          <FiExternalLink className="mr-1 h-3 w-3" />
                          Form
                        </a>
                        {event.formResponsesLink && (
                          <a
                            href={event.formResponsesLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:underline flex items-center"
                          >
                            <FiExternalLink className="mr-1 h-3 w-3" />
                            Responses
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-accent hover:text-accent-light"
                        title="Edit"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}