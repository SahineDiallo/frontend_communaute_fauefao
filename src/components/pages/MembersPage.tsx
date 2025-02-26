import { useState } from 'react';
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

// Données de démonstration pour les membres
const sampleMembers = [
  {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    date_joined: '2024-01-15',
    communaute: 'React Devs',
    role: 'Admin',
  },
  {
    id: 2,
    nom: 'Smith',
    prenom: 'Jane',
    date_joined: '2024-01-20',
    communaute: 'Tailwind Enthusiasts',
    role: 'Moderator',
  },
  {
    id: 3,
    nom: 'Wilson',
    prenom: 'Bob',
    date_joined: '2024-02-01',
    communaute: 'Next.js Experts',
    role: 'User',
  },
  {
    id: 4,
    nom: 'Johnson',
    prenom: 'Alice',
    date_joined: '2024-02-10',
    communaute: 'Vue.js Fans',
    role: 'User',
  },
  {
    id: 5,
    nom: 'Brown',
    prenom: 'Charlie',
    date_joined: '2024-02-15',
    communaute: 'Angular Developers',
    role: 'Moderator',
  },
  {
    id: 6,
    nom: 'Watson',
    prenom: 'Emma',
    date_joined: '2024-03-01',
    communaute: 'Svelte Enthusiasts',
    role: 'Admin',
  },
];

const MembersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrer les membres en fonction de la recherche
  const filteredMembers = sampleMembers.filter(
    (member) =>
      member.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.communaute.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gestion des changements de page
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Members</h2>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-customBlue text-white rounded-lg hover:bg-customBlue/90 transition duration-200"
          >
            <Plus className="h-4 w-4" />
            <span className="font-semibold">Add Member</span>
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Réinitialiser la pagination lors de la recherche
              }}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prénom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'adhésion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Communauté
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {member.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {member.prenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {member.date_joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {member.communaute}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 transition duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {paginatedMembers.length} of {filteredMembers.length} members
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;