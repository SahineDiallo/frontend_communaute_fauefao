import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from "../utils/Menus"
import { MenuItem } from '../utils/Menus';
import LanguageSwitcher from "./LanguageSwitcher";
import  Logo  from "../assets/logo-fauefao.png"
// import { ChevronDown, User } from 'lucide-react';
import MobileMenu  from "../components/menu/mobile"
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../hooks/useAppSelector';
import { ChevronDown, LogOut, User } from 'lucide-react';


const MainHeader:React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth); // Get auth state from Redux
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <header>
      <div className='bg-[#FDF2E9] hidden lg:block'>
        <div className="container mx-auto px-6 py-2 flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center space-x-6">
            <span>+221 33 864 77 57</span>
            <span>contact@femmesautonomes.org</span>
          </div>
          <div className="flex items-center space-x-6">
            <span>Données</span>
            <button className="text-orange-500">Se connecter</button>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher/>
            </div>
          </div>
        </div>
      </div>
      <nav className="container mx-auto px-6 py-4 flex-between md:px-3">
        <div className="flex-center gap-x-5">
          <div className="flex-center gap-4">
            <MobileMenu MobileMenus={Menu} />
            <img src={Logo} alt="Logo Fauefao" className='lg:h-[40px] sm:h-[30px] object-contain' />
          </div>
        </div>
        <ul className="hidden lg:flex items-center gap-6 ">
          {Menu.map((item:MenuItem) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex-center'>
          {/* <div className="flex items-center space-x-2">
            <LanguageSwitcher/>
          </div> */}
          {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user?.profile?.image_url || 'https://via.placeholder.com/40'} // Fallback image
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.full_name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                      </div>
                    </Link>
                    {/* <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Paramètres</span>
                      </div>
                    </Link> */}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-orange-500">
                Se connecter
              </Link>
            )}
        </div>
      </nav>
    </header>
  )
}

export default MainHeader