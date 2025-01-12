import React, { useEffect, useState } from 'react'
import { MenuItem } from '../utils/Menus';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setActiveTab } from '../store/features/tabs/tabsSlice';


interface MenuProps {
  MenuItems: MenuItem[];
}

const MenuPageDetail: React.FC<MenuProps> = ({ MenuItems }) => {
  // State to track the active tab
  const [currentTab, setCurrentTab] = useState<string>(MenuItems[0]?.name || '');
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(setActiveTab(currentTab))
  })
  // Handler to change active tab
  const handleTabChange = (name: string) => {
    setCurrentTab(name);
    dispatch(setActiveTab(name));
    
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
        <button className="ml-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition">
          Rejoindre
        </button>
      </div>
    </div>
  );
};

export default MenuPageDetail;
