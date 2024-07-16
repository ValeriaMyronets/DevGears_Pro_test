import { createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../api/users'
import { User } from '../types/user'
import { AddUserModal } from '../components/add-user-modal'
import editIcon from '../assets/edit-button.svg';
import closeIcon from '../assets/close-button.svg';

export const Route = createFileRoute('/users')({
  component: Users,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({to: '/login'});
    }
  }
})

function Users() {
  const columns = ['Name', 'Email', 'Phone number', ''];
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditUser = (selectedUser: User) => {
    setSelectedUser(selectedUser);
    handleOpenModal();
    setEditMode(true);
  }


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedUser(null);
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId)
      .then(() => setUsers((users) => users.filter((user) => user.id !== userId)))
      .catch(() => setErrorMessage('Unable to delete user'));
  }


  useEffect(() => {
    getUsers()
      .then((users) => {
        console.log(users)
        setUsers(users)
      })
      .catch(() => setErrorMessage('Unable to load users'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Button
        className="mb-4"
        ripple={true}
        onClick={handleOpenModal}
        placeholder=""
        onPointerEnterCapture={() => { }}
        onPointerLeaveCapture={() => { }}
      >
        Add user
      </Button>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users?.map(user => (
            <tr key={user.id} className="even:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-200">{user.name}</td>
              <td className="px-4 py-2 border-b border-gray-200">{user.email}</td>
              <td className="px-4 py-2 border-b border-gray-200">{user.phone}</td>
              <td className="px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                <button 
                  onClick={() => handleEditUser(user)}
                  className="flex items-center justify-center p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <img src={editIcon} alt="Edit Icon" width="20" height="20" />
                </button>
                
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <img src={closeIcon} alt="Close Icon" width="20" height="20" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ table>

      {isModalOpen && (
        <AddUserModal
          onClose={handleCloseModal}
          updateUsers={setUsers}
          editMode={editMode}
          selectedUser={selectedUser}
        />
      )}

      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}

    </div>
  )
}
