import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers, FiBook, FiAward, FiCalendar, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminName, setAdminName] = useState('Admin');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch admin details here
    setAdminName('Admin User');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uwiai_admin_token');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <FiUsers size={20} />, label: 'Members', path: 'members' },
    { icon: <FiBook size={20} />, label: 'Projects', path: 'projects' },
    { icon: <FiAward size={20} />, label: 'Innovators', path: 'innovators' },
    { icon: <FiCalendar size={20} />, label: 'Events', path: 'events' },
    { icon: <FiFileText size={20} />, label: 'Content', path: 'content' },
    { icon: <FiSettings size={20} />, label: 'Settings', path: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">UWIAI CMS</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome, {adminName}</p>
        </div>
        
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/admin/${item.path}`}
                  className={`flex items-center p-3 rounded-lg transition ${
                    activeTab === item.path ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(item.path)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Members</h3>
            <p className="text-3xl font-bold text-primary">124</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Active Projects</h3>
            <p className="text-3xl font-bold text-primary">18</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold text-primary">5</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/events/new"
              className="p-4 border border-gray-200 rounded-lg hover:border-accent transition text-center"
            >
              Add New Event
            </Link>
            <Link
              to="/admin/innovators/new"
              className="p-4 border border-gray-200 rounded-lg hover:border-accent transition text-center"
            >
              Add Innovator
            </Link>
            <Link
              to="/admin/content/stories/new"
              className="p-4 border border-gray-200 rounded-lg hover:border-accent transition text-center"
            >
              Add Story
            </Link>
            <Link
              to="/admin/talent-pool"
              className="p-4 border border-gray-200 rounded-lg hover:border-accent transition text-center"
            >
              Manage Talent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}