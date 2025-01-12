import React from 'react'
import { Link } from 'react-router-dom';
import { Menu } from "../utils/Menus"
import { MenuItem } from '../utils/Menus';
import LanguageSwitcher from "./LanguageSwitcher";
import  Logo  from "../assets/logo-fauefao.png"
import { ChevronDown, User } from 'lucide-react';
import MobileMenu  from "../components/menu/mobile"


const MainHeader:React.FC = () => {
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
          <div className="flex items-center space-x-2">
            <LanguageSwitcher/>
          </div>
          <Link to="/login">
            <button className="btn flex-center sm:items-end gap-2 sm:gap-0 sm:px-2">
              <User />
              <span className='hidden lg:block'>Login</span> 
              <ChevronDown className='' />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default MainHeader