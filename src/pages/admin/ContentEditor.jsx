import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiSave, 
  FiTrash2, 
  FiEdit, 
  FiExternalLink, 
  FiCopy, 
  FiFile, 
  FiGithub, 
  FiBook,
  FiArrowLeft,
  FiPlus,
  FiX,
  FiCalendar,
  FiMapPin,
  FiType,
  FiUser,
  FiLink,
  FiTag,
  FiUpload,
  FiVideo,
  FiFileText
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useEvents } from '../context/EventContext';

export default function ContentEditor({ type = 'projects', mode = 'list' }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { events, updateEvents } = useEvents();
  
  // State initialization
  const [projects, setProjects] = useState([]);
  const [contentSections, setContentSections] = useState([]);
  
  const [currentProject, setCurrentProject] = useState({
    id: '',
    title: '',
    creator: '',
    description: '',
    tags: [],
    status: 'Completed',
    links: { github: '', demo: '', pdf: '' },
    files: { video: null, pdf: null, text: null },
    filePreviews: { video: '', pdf: '', text: '' }
  });
  
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
  
  const [currentContent, setCurrentContent] = useState({
    id: '',
    section: '',
    title: '',
    content: '',
    lastUpdated: new Date().toISOString()
  });
  
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Enhanced data loader
  const loadData = useCallback(() => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('uwiai_projects')) || [];
      const savedContent = JSON.parse(localStorage.getItem('uwiai_content')) || [];
      
      setProjects(savedProjects);
      setContentSections(savedContent);
      
      if (mode === 'edit' && id) {
        if (type === 'projects') {
          const project = savedProjects.find(p => p.id === id);
          if (project) setCurrentProject(project);
        } else if (type === 'events') {
          const event = events.find(e => e.id === id);
          if (event) setCurrentEvent(event);
        } else if (type === 'content') {
          const content = savedContent.find(c => c.id === id);
          if (content) setCurrentContent(content);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data. Please refresh the page.');
    }
  }, [type, mode, id, events]);

  useEffect(() => {
    loadData();
    
    const handleStorageChange = (e) => {
      if (e.key === `uwiai_${type}`) {
        loadData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadData, type]);

  // Reset form for new items
  useEffect(() => {
    if (mode === 'create') {
      const resetStates = {
        projects: () => setCurrentProject({
          id: '', title: '', creator: '', description: '', tags: [],
          status: 'Completed', links: { github: '', demo: '', pdf: '' },
          files: { video: null, pdf: null, text: null },
          filePreviews: { video: '', pdf: '', text: '' }
        }),
        events: () => setCurrentEvent({
          id: '', title: '', date: '', time: '', location: '',
          description: '', type: 'Training',
          googleFormLink: '', formResponsesLink: ''
        }),
        content: () => setCurrentContent({
          id: '', section: '', title: '', content: '',
          lastUpdated: new Date().toISOString()
        })
      };
      
      resetStates[type]?.();
    }
  }, [type, mode]);

  // Enhanced save function with synchronization
  const saveData = useCallback(async (data, dataType) => {
    setIsSaving(true);
    try {
      if (dataType === 'events') {
        await updateEvents(data);
      } else {
        localStorage.setItem(`uwiai_${dataType}`, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('contentUpdated', {
          detail: { type: dataType }
        }));
      }
      
      toast.success(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} saved successfully!`);
      navigate(`/admin/${dataType}`);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [navigate, updateEvents]);

  // Project file handling
  const handleFileUpload = (fileType, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    setCurrentProject(prev => ({
      ...prev,
      files: { ...prev.files, [fileType]: file }
    }));

    if (fileType === 'video' || fileType === 'pdf') {
      const url = URL.createObjectURL(file);
      setCurrentProject(prev => ({
        ...prev,
        filePreviews: { ...prev.filePreviews, [fileType]: url }
      }));
    } else if (fileType === 'text') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentProject(prev => ({
          ...prev,
          filePreviews: { ...prev.filePreviews, text: e.target.result }
        }));
      };
      reader.readAsText(file);
    }

    toast.success(`${fileType.toUpperCase()} uploaded successfully`);
  };

  const removeFile = (fileType) => {
    setCurrentProject(prev => ({
      ...prev,
      files: { ...prev.files, [fileType]: null },
      filePreviews: { ...prev.filePreviews, [fileType]: '' }
    }));
    toast.info(`${fileType.toUpperCase()} removed`);
  };

  // Form submission handlers
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...currentProject,
      id: mode === 'edit' ? currentProject.id : Date.now().toString(),
      files: {
        video: currentProject.filePreviews.video,
        pdf: currentProject.filePreviews.pdf,
        text: currentProject.filePreviews.text
      }
    };
    
    const updatedProjects = mode === 'edit'
      ? projects.map(p => p.id === newProject.id ? newProject : p)
      : [...projects, newProject];
    
    saveData(updatedProjects, 'projects');
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!currentEvent.googleFormLink.includes('docs.google.com/forms')) {
      toast.error('Please enter a valid Google Form link');
      return;
    }
    
    const newEvent = {
      ...currentEvent,
      id: mode === 'edit' ? currentEvent.id : Date.now().toString(),
      formResponsesLink: currentEvent.formResponsesLink || 
        currentEvent.googleFormLink.replace('/viewform', '/viewanalytics')
    };
    
    const updatedEvents = mode === 'edit'
      ? events.map(e => e.id === newEvent.id ? newEvent : e)
      : [...events, newEvent];
    
    saveData(updatedEvents, 'events');
  };

  const handleContentSubmit = (e) => {
    e.preventDefault();
    const newContent = {
      ...currentContent,
      id: mode === 'edit' ? currentContent.id : Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    
    const updatedContent = mode === 'edit'
      ? contentSections.map(c => c.id === newContent.id ? newContent : c)
      : [...contentSections, newContent];
    
    saveData(updatedContent, 'content');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'projects') {
        saveData(projects.filter(p => p.id !== id), 'projects');
      } else if (type === 'events') {
        saveData(events.filter(e => e.id !== id), 'events');
      } else if (type === 'content') {
        saveData(contentSections.filter(c => c.id !== id), 'content');
      }
    }
  };

  // Tag management
  const addTag = () => {
    if (newTag && !currentProject.tags.includes(newTag)) {
      setCurrentProject(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setCurrentProject(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Render methods for each content type
  if (type === 'projects') {
    return mode === 'list' ? (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Projects Management</h1>
          <button
            onClick={() => navigate('/admin/projects/new')}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Project
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects added yet</p>
          ) : (
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-gray-600">
                        {project.creator} • {project.status}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.files?.video && (
                        <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1">
                          <FiVideo className="mr-1" /> Has Video
                        </span>
                      )}
                      {project.files?.pdf && (
                        <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-1 ml-1">
                          <FiFile className="mr-1" /> Has PDF
                        </span>
                      )}
                      {project.files?.text && (
                        <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded mt-1 ml-1">
                          <FiFileText className="mr-1" /> Has Docs
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                        className="text-accent hover:text-accent-light"
                        title="Edit"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
    ) : (
      <div className="p-8">
        <button
          onClick={() => navigate('/admin/projects')}
          className="flex items-center text-gray-600 hover:text-accent mb-4"
        >
          <FiArrowLeft className="mr-2" /> Back to Projects
        </button>

        <h1 className="text-2xl font-bold text-primary mb-6">
          {mode === 'edit' ? 'Edit Project' : 'Add New Project'}
        </h1>

        <form onSubmit={handleProjectSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                value={currentProject.title}
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Creator*</label>
              <input
                type="text"
                value={currentProject.creator}
                onChange={(e) => setCurrentProject({...currentProject, creator: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              value={currentProject.description}
              onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-r"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map(tag => (
                <span key={tag} className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Project Files</h3>
            
            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiVideo className="inline mr-2" />
                Project Video
              </label>
              {currentProject.filePreviews.video ? (
                <div className="mb-2">
                  <video 
                    controls 
                    className="max-w-full h-auto mb-2 rounded border border-gray-200"
                    src={currentProject.filePreviews.video}
                  />
                  <button
                    type="button"
                    onClick={() => removeFile('video')}
                    className="text-red-500 text-sm hover:text-red-700 flex items-center"
                  >
                    <FiX className="mr-1" /> Remove Video
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center">
                    <FiUpload className="mr-2" />
                    Upload Video
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload('video', e)}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-2 text-sm text-gray-500">MP4, WebM, etc. (max 10MB)</span>
                </div>
              )}
            </div>

            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFile className="inline mr-2" />
                Project PDF
              </label>
              {currentProject.filePreviews.pdf ? (
                <div className="mb-2">
                  <div className="flex items-center">
                    <FiFile className="mr-2 text-gray-500" />
                    <a 
                      href={currentProject.filePreviews.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile('pdf')}
                    className="text-red-500 text-sm hover:text-red-700 flex items-center mt-1"
                  >
                    <FiX className="mr-1" /> Remove PDF
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center">
                    <FiUpload className="mr-2" />
                    Upload PDF
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload('pdf', e)}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-2 text-sm text-gray-500">PDF files only (max 10MB)</span>
                </div>
              )}
            </div>

            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFileText className="inline mr-2" />
                Project Documentation
              </label>
              {currentProject.filePreviews.text ? (
                <div className="mb-2">
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-2">
                    <pre className="text-sm whitespace-pre-wrap">{currentProject.filePreviews.text}</pre>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile('text')}
                    className="text-red-500 text-sm hover:text-red-700 flex items-center"
                  >
                    <FiX className="mr-1" /> Remove Text File
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center">
                    <FiUpload className="mr-2" />
                    Upload Text File
                    <input
                      type="file"
                      accept=".txt,.md"
                      onChange={(e) => handleFileUpload('text', e)}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-2 text-sm text-gray-500">TXT, MD files (max 10MB)</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-light"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : (
                <>
                  <FiSave className="inline mr-2" />
                  Save Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (type === 'events') {
    return mode === 'list' ? (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Events Management</h1>
          <button
            onClick={() => navigate('/admin/events/new')}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Event
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
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
                        <FiCalendar className="inline mr-1" />
                        {event.date} • {event.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        <FiMapPin className="inline mr-1" />
                        {event.location}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/events/${event.id}/edit`)}
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
    ) : (
      <div className="p-8">
        <button
          onClick={() => navigate('/admin/events')}
          className="flex items-center text-gray-600 hover:text-accent mb-4"
        >
          <FiArrowLeft className="mr-2" /> Back to Events
        </button>

        <h1 className="text-2xl font-bold text-primary mb-6">
          {mode === 'edit' ? 'Edit Event' : 'Add New Event'}
        </h1>

        <form onSubmit={handleEventSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              value={currentEvent.title}
              onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
              <input
                type="date"
                value={currentEvent.date}
                onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
              <input
                type="time"
                value={currentEvent.time}
                onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={currentEvent.type}
                onChange={(e) => setCurrentEvent({...currentEvent, type: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Training">Training</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
            <input
              type="text"
              value={currentEvent.location}
              onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              value={currentEvent.description}
              onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Form Link*</label>
            <input
              type="url"
              value={currentEvent.googleFormLink}
              onChange={(e) => setCurrentEvent({...currentEvent, googleFormLink: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="https://docs.google.com/forms/..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/events')}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-light"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : (
                <>
                  <FiSave className="inline mr-2" />
                  Save Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (type === 'content') {
    return mode === 'list' ? (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Content Management</h1>
          <button
            onClick={() => navigate('/admin/content/new')}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Content
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {contentSections.length === 0 ? (
            <p className="text-gray-500">No content sections added yet</p>
          ) : (
            <div className="space-y-4">
              {contentSections.map(content => (
                <div key={content.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{content.title}</h3>
                      <p className="text-sm text-gray-600">
                        <FiType className="inline mr-1" />
                        {content.section}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/content/${content.id}/edit`)}
                        className="text-accent hover:text-accent-light"
                        title="Edit"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(content.id)}
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
    ) : (
      <div className="p-8">
        <button
          onClick={() => navigate('/admin/content')}
          className="flex items-center text-gray-600 hover:text-accent mb-4"
        >
          <FiArrowLeft className="mr-2" /> Back to Content
        </button>

        <h1 className="text-2xl font-bold text-primary mb-6">
          {mode === 'edit' ? 'Edit Content' : 'Add New Content'}
        </h1>

        <form onSubmit={handleContentSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section*</label>
              <select
                value={currentContent.section}
                onChange={(e) => setCurrentContent({...currentContent, section: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select a section</option>
                <option value="about">About Us</option>
                <option value="mission">Mission</option>
                <option value="team">Team</option>
                <option value="contact">Contact</option>
                <option value="stories">Featured Stories</option>
                <option value="resources">Resources</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                value={currentContent.title}
                onChange={(e) => setCurrentContent({...currentContent, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
            <textarea
              value={currentContent.content}
              onChange={(e) => setCurrentContent({...currentContent, content: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded min-h-[200px]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
            <input
              type="text"
              value={new Date(currentContent.lastUpdated).toLocaleString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/content')}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-light"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : (
                <>
                  <FiSave className="inline mr-2" />
                  Save Content
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Content Editor</h1>
      <p className="text-gray-600">Select a section to edit from the sidebar</p>
    </div>
  );
}