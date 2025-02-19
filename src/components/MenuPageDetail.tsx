import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './ui/Modal';
import DiscussionForm from './discussions/DiscussionForm';
import SocialShareDropdown from './react-share/Share';
import AddDropdownMenu from './react-share/actionDropdown';
import FichierForm from './forms/FichierForm';
import { logout } from '../store/features/auth/authSlice';
import useAuth from '../hooks/useAuth';

interface MenuPageDetailProps {
  MenuItems: {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
  }[];
  communityPkId?: string; // Make communityPkId optional
}

const MenuPageDetail: React.FC<MenuPageDetailProps> = ({ MenuItems, communityPkId }: MenuPageDetailProps) => {
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { pkId } = useParams<{ pkId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRessourceModalOpen, setRessourceIsModalOpen] = useState(false);
  const [tempFiles, setTempFiles] = useState<string[]>([]);
  const { refreshToken } = useAuth();
  const domain = import.meta.env.VITE_MAIN_DOMAIN;

  useEffect(() => {
    const checkMembership = async () => {
      if (!isAuthenticated || !pkId) {
        setIsMember(false);
        return;
      }
      setLoading(true);

      try {
        let token = localStorage.getItem("token");
        let response = await fetch(`${domain}/api/check-membership/${pkId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          const errorData = await response.json();
          if (errorData.code === "token_not_valid") {
            const newToken = await refreshToken();
            localStorage.setItem("token", newToken);
            token = newToken;
            response = await fetch(`${domain}/api/check-membership/${pkId}/`, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
          }
        }

        if (!response.ok) {
          throw new Error('Failed to check membership');
        }

        const data = await response.json();
        setIsMember(data.is_member);
      } catch (error) {
        console.error('Error checking membership:', error);
        if (error instanceof Error && error.message === "Failed to refresh token") {
          logout();
          alert("Your session has expired. Please log in again.");
        }
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, [isAuthenticated, pkId, refreshToken, domain]);

  if (!communityPkId) {
    return <div>Community ID is missing.</div>;
  }

  const handleJoinCommunity = () => {
    if (!isAuthenticated) {
      navigate(`/login?next=/communaute-details/${pkId}/a-propos`);
      return;
    }
    joinCommunity(pkId!);
  };

  const handleLeaveCommunity = async (communaute_id: string) => {
    const apiDomain = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(`${apiDomain}/leave-community/${communaute_id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setIsMember(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la tentative de quitter la communauté.');
      console.error(error);
    }
  };

  const joinCommunity = async (pkId: string) => {
    const token = localStorage.getItem("token");
    const domain = import.meta.env.VITE_MAIN_DOMAIN;
    try {
      const response = await fetch(`${domain}/api/join-community/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          communaute_id: pkId,
          role: 'membre',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to join the community');
      }

      setIsMember(true);
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error('Error joining community:', error);
      alert('Failed to join the community. Please try again.');
    }
  };

  const handleTempFileUpload = (tempFilePath: string) => {
    setTempFiles((prev) => [...prev, tempFilePath]);
  };

  const resetTempFiles = () => setTempFiles([]);

  const handleOnClose = (new_obj: { new_obj: boolean } = { new_obj: false }) => {
    if (!new_obj.new_obj) cleanupTempFiles();
    setIsModalOpen(false);
  };

  const handleRessourceOnClose = () => setRessourceIsModalOpen(false);

  const cleanupTempFiles = async () => {
    if (tempFiles.length === 0) return;

    try {
      const response = await fetch(`${domain}/api/cleanup-temp-file/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fichierIds: tempFiles }),
      });

      const data = await response.json();
      setTempFiles([]);
      return data;
    } catch (error) {
      console.error('Error cleaning up temporary files:', error);
    }
  };

  return (
    <div>
      {/* Menu Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-0 pt-2 space-y-4 md:space-y-0">
        {/* Menu Items */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {MenuItems.map((item) => {
            const Icon = item.icon;
            const dynamicPath = item.path
              .replace(':pkId', communityPkId)
              .replace(':tab', item.name.toLowerCase());
            const isActive = location.pathname === dynamicPath;

            return (
              <Link
                key={item.name}
                to={dynamicPath}
                className={`flex items-center space-x-2 ${
                  isActive ? 'text-[#e86928]' : 'text-gray-600 hover:text-[#e86928]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </ul>

        {/* Button */}
        {loading ? (
          <div>Loading...</div>
        ) : isMember ? (
          <div className="flex items-center gap-3">
            <div className='fixed top-[50%] right-3'>
                <SocialShareDropdown />
            </div>
            <AddDropdownMenu
              setIsModalOpen={setIsModalOpen}
              setIsRessourceModalOpen={setRessourceIsModalOpen}
              pkId={pkId}
              handleLeaveCommunity={handleLeaveCommunity}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className='fixed top-[50%] right-3'>
                <SocialShareDropdown />
            </div>
          <button
            onClick={handleJoinCommunity}
            className="bg-[#EF8450] px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
          >
            Rejoindre
          </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => handleOnClose()} title="Ajouter une discussion">
        <DiscussionForm
          onClose={(new_obj = { new_obj: false }) => handleOnClose(new_obj)}
          onTempFileUpload={handleTempFileUpload}
          tempFiles={tempFiles}
          resetFiles={resetTempFiles}
        />
      </Modal>
      <Modal isOpen={isRessourceModalOpen} onClose={() => handleRessourceOnClose()} title="Ajouter une ressource">
        <FichierForm
          onClose={() => handleRessourceOnClose()}
          communauteId={communityPkId}
        />
      </Modal>
    </div>
  );
};

export default MenuPageDetail;