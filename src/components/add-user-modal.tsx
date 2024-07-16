import { useEffect, useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { createUser, updateUser } from '../api/users';
import { User } from '../types/user';
import { toast } from 'react-toastify';

type AddUserModalProps = {
  onClose: () => void;
  updateUsers: React.Dispatch<React.SetStateAction<User[]>>;
  editMode: boolean;
  selectedUser: User | null;
};

export const AddUserModal = ({ onClose, updateUsers, editMode, selectedUser }: AddUserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (editMode && selectedUser) {
      const { name, email, phone } = selectedUser;
      setName(name);
      setEmail(email || '');
      setPhone(phone || '');
    }
  }, [editMode, selectedUser]);

  const validateInputs = () => {
    const errors = { name: '', email: '', phone: '' };

    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!phone.trim()) {
      errors.phone = 'Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrorMessage(errors);
    return isValid;
  };

  const handleCreate = () => {
    if (validateInputs()) {
      const newUser = { name, email, phone };

      createUser(newUser)
        .then((user) => {
          updateUsers((users) => [...users, user]);
          toast.success('User created successfully');
          onClose();
        })
        .catch(() => toast.error('Unable to create user'));
    }
  }
  const handleUpdate = () => {
    if (validateInputs() && selectedUser) {
      const updatedUser = { ...selectedUser, name, email, phone };

      updateUser(updatedUser)
        .then((user) => {
          updateUsers((users) => users.map((u) => u.id === user.id ? user : u));
          toast.success('User updated successfully');
          onClose();
        })
        .catch(() => toast.error('Unable to update user'));
    }
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className='space-y-4'>
          <div>
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mb-4 ${errorMessage.name ? 'border border-red-500' : ''}`}
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              crossOrigin=""
            />
            {errorMessage.name && <p className="text-red-500 text-sm mt-1">{errorMessage.name}</p>}
          </div>


          <div>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mb-4 ${errorMessage.email ? 'border border-red-500' : ''}`}
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              crossOrigin=""
            />
            {errorMessage.email && <p className="text-red-500 text-sm mt-1">{errorMessage.email}</p>}
          </div>

          <div>
            <Input
              type="text"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`mb-4 ${errorMessage.phone ? 'border border-red-500' : ''}`}
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              crossOrigin=""
            />
            {errorMessage.phone && <p className="text-red-500 text-sm mt-1">{errorMessage.phone}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            color="red"
            ripple={true}
            onClick={onClose}
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            Cancel
          </Button>

          {editMode ? (
            <Button
              color="blue"
              ripple={true}
              onClick={handleUpdate}
              placeholder=""
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
            >
              Update
            </Button>
          ) : (
            <Button
              color="green"
              ripple={true}
              onClick={handleCreate}
              placeholder=""
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
            >
              Create
            </Button>
          )}

        </div>
      </div>
    </div>
  );
};