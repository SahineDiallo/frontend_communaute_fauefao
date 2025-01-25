import React, { useEffect, useState } from 'react'
import { MenuItem } from '../utils/Menus';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setActiveTab } from '../store/features/tabs/tabsSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsAuthenticated } from '../store/features/auth/authSlice';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
// import { LogOut, MessageSquare, PlusCircle, ShareIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './ui/Modal';
import DiscussionForm from './discussions/DiscussionForm';
import SocialShareDropdown from './react-share/Share';
import AddDropdownMenu from './react-share/actionDropdown';

interface MenuProps {
  MenuItems: MenuItem[];
}

const MenuPageDetail: React.FC<MenuProps> = ({ MenuItems }) => {
  // State to track the active tab
  const [currentTab, setCurrentTab] = useState<string>(MenuItems[0]?.name || '');
  const dispatch = useAppDispatch();
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated); // Check if the user is logged in
  const { pkId } = useParams<{ pkId: string }>(); // Get the community ID from the URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempFiles, setTempFiles] = useState<string[]>([]);


  useEffect(()=> {
    dispatch(setActiveTab(currentTab))
  })

  useEffect(() => {
    const checkMembership = async () => {
      if (!isAuthenticated || !pkId) {
        setIsMember(false);
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:8000/api/check-membership/${pkId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to check membership');
        }

        const data = await response.json();
        setIsMember(data.is_member);
      } catch (error) {
        console.error('Error checking membership:', error);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, [isAuthenticated, pkId]);

  // Handler to change active tab
  const handleTabChange = (name: string) => {
    setCurrentTab(name);
    dispatch(setActiveTab(name));  
  };

  const handleJoinCommunity = () => {
    if (!isAuthenticated) {
      // Redirect to the login page with the `next` parameter
      navigate(`/login?next=/communaute-details/${pkId}`);
      return;
    }

    // If the user is logged in, proceed to join the community
    joinCommunity(pkId!);
  };

  const handleLeaveCommunity = async (communaute_id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/leave-community/${communaute_id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le token d'authentification si nécessaire
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message); // Afficher une notification de succès
        setIsMember(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error); // Afficher une notification d'erreur
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la tentative de quitter la communauté.');
      console.error(error) // Afficher une notification d'erreur
    }
  };
  
  const joinCommunity = async (pkId: string) => {
    const token = localStorage.getItem("token")
    console.log("here is the token", token)
    try {
      const response = await fetch(`http://localhost:8000/api/join-community/`, {
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
      const data = await response.json(); // Update the membership status
      toast.success(data.message);
    } catch (error) {
      console.error('Error joining community:', error);
      alert('Failed to join the community. Please try again.');
    }
  };


  const handleTempFileUpload = (tempFilePath: string) => {
    setTempFiles((prev) => [...prev, tempFilePath]);
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
    cleanupTempFiles();
  }
  const cleanupTempFiles = async () => {
    if (tempFiles.length === 0) return; // No files to clean up
  
    try {
      // Send a request to the backend to clean up each temporary file
      await Promise.all(
        tempFiles.map((tempFileUrl) =>
          fetch('http://localhost:8000/api/cleanup-temp-file/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tempFileUrl }),
          })
        )
      );
  
      // Clear the temporary files state
      setTempFiles([]);
    } catch (error) {
      console.error('Error cleaning up temporary files:', error);
    }
  };
  return (
    <div>
      {/* Menu Bar */}
      <div className="flex items-center justify-between px-0 pt-2">
        {/* Menu Items */}
        <ul className="flex items-center space-x-6">
          {MenuItems.map((item) => (
            <li
              key={item.path}
              className={`cursor-pointer ${
                currentTab === item.name ? 'text-blue-600' : 'text-gray-600'
              } hover:text-blue-500 transition-colors flex items-center gap-1`}
              onClick={() => handleTabChange(item.name)}
            >
              <item.icon size={20} />
              <span className="flex items-center"> {item.name} </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        {loading ? (
        <div>Loading...</div>
        ) : isMember ? (
            <div className="flex items-center gap-3">
              <SocialShareDropdown />
              <AddDropdownMenu
                setIsModalOpen={setIsModalOpen}
                pkId={pkId}
                handleLeaveCommunity={handleLeaveCommunity}
              />
            </div>
        ) : (
        <button
          onClick={handleJoinCommunity}
          className="ml-auto bg-[#EF8450] px-4 py-4 text-md font-semibold text-white shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
        >
          Rejoindre
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => handleOnClose()}>
        <DiscussionForm
          onClose={() => handleOnClose()}
          onTempFileUpload={handleTempFileUpload}
          tempFiles={tempFiles}
        />
      </Modal>
      </div>
    </div>
  );
};

export default MenuPageDetail;
