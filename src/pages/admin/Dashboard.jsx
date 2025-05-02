import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBook, FiAward, FiCalendar, FiFileText } from 'react-icons/fi';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { icon: <FiUsers size={20} />, label: 'Members', path: 'members' },
    { icon: <FiBook size={20} />, label: 'Projects', path: 'projects' },
    { icon: <FiAward size={20} />, label: 'Innovators', path: 'innovators' },
    { icon: <FiCalendar size={20} />, label: 'Events', path: 'events' },
    { icon: <FiFileText size={20} />, label: 'Content', path: 'content' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">UWAI CMS</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/admin/${item.path}`}
                  className={`flex items-center p-3 rounded-lg transition ${activeTab === item.path ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab(item.path)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}