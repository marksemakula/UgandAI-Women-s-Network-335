// utils/eventHelpers.js
export const validateEvent = (event) => {
  return {
    id: event.id || Date.now().toString(),
    title: event.title || 'Untitled Event',
    date: event.date || null,
    time: event.time || '',
    location: event.location || 'Location TBD',
    type: event.type || 'Event',
    description: event.description || '',
    googleFormLink: event.googleFormLink || '',
    formResponsesLink: event.formResponsesLink || '',
    lastUpdated: new Date().toISOString()
  };
};

export const syncEvents = (updatedEvents) => {
  localStorage.setItem('uwiai_events', JSON.stringify(updatedEvents));
  
  // Dispatch to same tab
  window.dispatchEvent(new CustomEvent('uwiai_events_updated'));
  
  // Dispatch to other tabs
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'uwiai_events',
    newValue: JSON.stringify(updatedEvents),
    oldValue: localStorage.getItem('uwiai_events'),
    storageArea: localStorage,
    url: window.location.href
  }));
};