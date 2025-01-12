import { ChevronDown } from 'lucide-react';
import React from 'react';
import { MenuItem } from '../../utils/Menus';



interface PageDetailMenuProps {
    MenuItem: MenuItem;
}


const PageDetailsMenu: React.FC<PageDetailMenuProps> = ({ MenuItem }) => {
    const hasSubMenu = MenuItem?.subMenus && MenuItem?.subMenus?.length > 0; // Check if there are submenu items
  
    return (
      <li key={MenuItem.path} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <MenuItem.icon size={20} />
          <span className="flex items-center">
            {MenuItem.name}
            {hasSubMenu && <ChevronDown className="ml-1 mt-0.5" />}
          </span>
      </li>
    );
  };
  
  export default PageDetailsMenu;