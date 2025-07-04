import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiSearch, FiUser, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function TalentPoolManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([
    {
      id: '5f8d0d55b54764421b7156c3',
      name: 'Sarah Nakato',
      email: 'sarah@example.com',
      profileLink: 'https://linkedin.com/in/sarah-nakato',
      publicLink: 'uwaitalent/sarah-nakato',
      expertise: 'Machine Learning, Healthcare AI',
      status: 'approved'
    },
    {
      id: '5f8d0d55b54764421b7156c4',
      name: 'Grace Mbabazi',
      email: 'grace@example.com',
      profileLink: 'https://linkedin.com/in/grace-mbabazi',
      publicLink: 'uwaitalent/grace-mbabazi',
      expertise: 'Data Science, NLP',
      status: 'pending'
    },
    {
      id: '5f8d0d55b54764421b7156c5',
      name: 'Diana Kibuuka',
      email: 'diana@example.com',
      profileLink: 'https://linkedin.com/in/diana-kibuuka',
      publicLink: 'uwaitalent/diana-kibuuka',
      expertise: 'Computer Vision, Robotics',
      status: 'rejected'
    }
  ]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id) => {
    setMembers(members.map(member =>
      member.id === id ? { ...member, status: 'approved' } : member
    ));
  };

  const handleReject = (id) => {
    setMembers(members.map(member =>
      member.id === id ? { ...member, status: 'rejected' } : member
    ));
  };

  const handleDelete = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit member with id:', id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Talent Pool Management</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.expertise}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    href={member.profileLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light"
                  >
                    {member.publicLink}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${member.status === 'approved' ? 'bg-green-100 text-green-800' : 
                member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {member.status !== 'approved' && (
                    <button 
                      onClick={() => handleApprove(member.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Approve"
                    >
                      Approve
                    </button>
                  )}
                  {member.status !== 'rejected' && (
                    <button 
                      onClick={() => handleReject(member.id)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Reject"
                    >
                      Reject
                    </button>
                  )}
                  <button 
                    onClick={() => handleEdit(member.id)}
                    className="text-accent hover:text-accent-light"
                    title="Edit"
                  >
                    <FiEdit className="inline" />
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FiTrash2 className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// PropTypes validation
TalentPoolManager.propTypes = {
  // Add any props the component receives here
  // Example:
  // initialMembers: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     email: PropTypes.string.isRequired,
  //     profileLink: PropTypes.string.isRequired,
  //     publicLink: PropTypes.string.isRequired,
  //     expertise: PropTypes.string.isRequired,
  //     status: PropTypes.oneOf(['approved', 'pending', 'rejected']).isRequired
  //   })
  // )
};