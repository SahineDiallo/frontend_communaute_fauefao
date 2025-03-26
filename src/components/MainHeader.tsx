import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "../utils/Menus";
import { MenuItem } from '../utils/Menus';
import Logo from "../assets/logo-fauefao.png";
import MobileMenu from "../components/menu/mobile";
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../hooks/useAppSelector';
import { ChevronDown, LogOut, MenuIcon, User } from 'lucide-react';

const MainHeader: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const domain = import.meta.env.VITE_MAIN_DOMAIN;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header>
      <div className='bg-[#FDF2E9] hidden lg:block'>
        <div className="container mx-auto px-6 py-2 flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center space-x-6">
            <span>+221 33 864 77 57</span>
            <span>contact@femmesautonomes.org</span>
          </div>
          {/* <div className="flex items-center space-x-6">
            <span>Données</span>
            <button className="text-orange-500">Se connecter</button>
          </div> */}
        </div>
      </div>

      <nav className="container mx-auto px-6 py-4 flex-between md:px-3 relative">

        <div className="flex items-center flex-center lg:gap-x-5">
          <button onClick={toggleMobileMenu} className="lg:hidden size-5 mb-2">
            <MenuIcon size={30} className='mb-3'/>
          </button>
          <div className="flex-center gap-4">
            <MobileMenu MobileMenus={Menu} isOpen={isMobileMenuOpen} closeMenu={closeMobileMenu} />
            <Link to="https://www.fauefao.org">
              <img src={Logo} alt="Logo Fauefao" className='h-8 object-contain' /> {/* Reduced logo size */}
            </Link>
          </div>
        </div>

        <ul className="hidden lg:flex items-center gap-6">
          {Menu.map((item: MenuItem) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-2 hover:text-[#ef8450] transition-colors duration-300">
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex-center'>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={`${domain}/${user?.profile.image_url}`}
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
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </div>
                  </Link>
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
  );
};

export default MainHeader;