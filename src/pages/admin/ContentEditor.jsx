import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiTrash2, FiEdit, FiCalendar, FiClock, FiMapPin, FiLink, FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';

export default function ContentEditor() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '18:00',
    location: '',
    description: '',
    type: 'Training',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdYOUR_FORM_ID/viewform'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Google Sheets configuration
  const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1vN7WYbArq_moeF1dP1bhW65OrjmXnrcb99t5W1vdd7Y/edit#gid=0';
  const GOOGLE_FORM_TEMPLATE = 'https://docs.google.com/forms/d/e/1FAIpQLSdYOUR_FORM_ID/viewform';

  useEffect(() => {
    // Load events from localStorage
    const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
    setEvents(savedEvents);
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent(prev => ({ ...prev, [name]: value }));
  };

  const saveEventsToStorage = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem('uwiai_events', JSON.stringify(updatedEvents));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let updatedEvents;
      
      if (isEditing) {
        updatedEvents = events.map(event => 
          event.id === currentEvent.id ? currentEvent : event
        );
      } else {
        updatedEvents = [...events, { 
          ...currentEvent, 
          id: Date.now().toString(),
          registrationLink: GOOGLE_FORM_TEMPLATE
        }];
      }
      
      saveEventsToStorage(updatedEvents);
      setCurrentEvent({
        id: '',
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '18:00',
        location: '',
        description: '',
        type: 'Training',
        registrationLink: GOOGLE_FORM_TEMPLATE
      });
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save event. Please try again.');
      console.error('Save error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      saveEventsToStorage(updatedEvents);
    }
  };

  if (section !== 'events') {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-accent hover:text-accent-light mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        
        <h1 className="text-2xl font-bold text-primary mb-6">
          {section ? `${section.charAt(0).toUpperCase() + section.slice(1)} Editor` : 'Content Editor'}
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Select a content section to edit from the admin menu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center text-accent hover:text-accent-light mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold text-primary mb-6">Events Management</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Form */}
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
                placeholder="Virtual or physical address"
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
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                name="description"
                value={currentEvent.description}
                onChange={handleEventChange}
                rows="3"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="Brief description of the event"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Form Link*</label>
              <div className="flex items-center">
                <FiLink className="mr-2 text-gray-400" />
                <input
                  type="url"
                  name="registrationLink"
                  value={currentEvent.registrationLink}
                  onChange={handleEventChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="https://docs.google.com/spreadsheets/d/1vN7WYbArq_moeF1dP1bhW65OrjmXnrcb99t5W1vdd7Y/edit?usp=sharing"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                <a href={GOOGLE_SHEET_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  View Responses Spreadsheet
                </a>
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentEvent({
                      id: '',
                      title: '',
                      date: format(new Date(), 'yyyy-MM-dd'),
                      time: '18:00',
                      location: '',
                      description: '',
                      type: 'Training',
                      registrationLink: GOOGLE_FORM_TEMPLATE
                    });
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition flex items-center ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="inline mr-2" />
                    {isEditing ? 'Update Event' : 'Add Event'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Events List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Events</h2>
            <span className="text-sm text-gray-500">
              {events.length} {events.length === 1 ? 'event' : 'events'}
            </span>
          </div>
          
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No events scheduled yet</p>
              <p className="mt-1 text-sm">Add your first event using the form</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
                <div key={event.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          event.type === 'Training' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                          event.type === 'Conference' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.type}
                        </span>
                        <span className="mx-2">•</span>
                        {format(new Date(event.date), 'MMM d, yyyy')}
                        <span className="mx-2">•</span>
                        {event.time}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-accent hover:text-accent-light p-1"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {event.description}
                  </div>
                  {event.registrationLink && (
                    <div className="mt-2">
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline flex items-center"
                      >
                        <FiLink className="mr-1" /> Registration Link
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}