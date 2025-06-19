import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  FiUsers, 
  FiBook, 
  FiAward, 
  FiCalendar, 
  FiFileText, 
  FiSettings, 
  FiLogOut,
  FiPlusCircle,
  FiUserPlus,
  FiUsers as FiTalent,
  FiHome
} from 'react-icons/fi';

export default function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    return path;
  });
  
  const [adminName, setAdminName] = useState('Admin');
  const [stats, setStats] = useState({
    members: 0,
    projects: 0,
    events: 0,
    contentSections: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('uwiai_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const savedProjects = JSON.parse(localStorage.getItem('uwiai_projects')) || [];
        const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
        const contentSections = JSON.parse(localStorage.getItem('uwiai_content')) || [];
        
        setAdminName('Admin User');
        setStats({
          members: 124,
          projects: savedProjects.length,
          events: savedEvents.length,
          contentSections: contentSections.length
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uwiai_admin_token');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Dashboard', path: 'dashboard' },
    { icon: <FiUsers size={20} />, label: 'Members', path: 'members' },
    { icon: <FiBook size={20} />, label: 'Projects', path: 'projects' },
    { icon: <FiAward size={20} />, label: 'Innovators', path: 'innovators' },
    { icon: <FiCalendar size={20} />, label: 'Events', path: 'events' },
    { 
      icon: <FiFileText size={20} />, 
      label: 'Content', 
      path: 'content',
      subItems: [
        { label: 'Pages', path: 'content/pages' },
        { label: 'Blog', path: 'content/blog' },
        { label: 'Resources', path: 'content/resources' }
      ]
    },
    { icon: <FiSettings size={20} />, label: 'Settings', path: 'settings' }
  ];

  const quickActions = [
    { 
      icon: <FiPlusCircle size={24} className="mb-2 mx-auto" />, 
      label: 'Add Project', 
      path: '/admin/projects/new' 
    },
    { 
      icon: <FiCalendar size={24} className="mb-2 mx-auto" />, 
      label: 'Add Event', 
      path: '/admin/events/new' 
    },
    { 
      icon: <FiUserPlus size={24} className="mb-2 mx-auto" />, 
      label: 'Add Member', 
      path: '/admin/members/new' 
    },
    { 
      icon: <FiFileText size={24} className="mb-2 mx-auto" />, 
      label: 'Add Content', 
      path: '/admin/content/new' 
    }
  ];

  const isContentSection = activeTab === 'content' || location.pathname.includes('/admin/content');

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
                    activeTab === item.path ? 'bg-accent/10 text-accent font-medium' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(item.path)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
                
                {/* Sub-items for content section */}
                {item.path === 'content' && isContentSection && (
                  <ul className="ml-8 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={`/admin/${subItem.path}`}
                          className={`flex items-center p-2 text-sm rounded-lg transition ${
                            location.pathname.includes(subItem.path) 
                              ? 'bg-accent/5 text-accent font-medium' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}