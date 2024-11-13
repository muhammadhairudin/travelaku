import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../../store/slices/profileSlice';
import { Text, Button } from '../../../../components/atoms';
import EditProfileModal from './EditProfileModal';

const ProfileInfo = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdateSuccess = async (updatedData) => {
    try {
      await dispatch(updateProfile(updatedData)).unwrap();
      setIsEditModalOpen(false);
    } catch {
      // Error handled in slice
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src={user.profilePictureUrl || '/default-avatar.png'}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <Text variant="h2" className="text-xl font-bold">
          {user.name}
        </Text>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div>
          <Text variant="label" className="text-gray-500">Email</Text>
          <Text variant="body1">{user.email}</Text>
        </div>

        <div>
          <Text variant="label" className="text-gray-500">Nomor Telepon</Text>
          <Text variant="body1">{user.phoneNumber || '-'}</Text>
        </div>

        <div>
          <Text variant="label" className="text-gray-500">Role</Text>
          <Text variant="body1" className="capitalize">{user.role}</Text>
        </div>

        {/* Edit Button */}
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Profil
        </Button>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateSuccess}
        initialData={user}
      />
    </div>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    role: PropTypes.string.isRequired,
    profilePictureUrl: PropTypes.string
  }).isRequired
};

export default ProfileInfo; 