import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MenuItem } from '../../utils/Menus';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    MobileMenus: MenuItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ MobileMenus }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the open/close state of the menu
    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <div className="lg:hidden flex-center">
            <button className="z-[999] relative" onClick={toggleIsOpen}>
                {isOpen ? <X size={30}/> : <Menu size={30}/>}
            </button>
            {isOpen && (
                <div className="fixed z-[999] overflow-y-auto h-full bg-black left-0 right-0 top-16 text-white p-6">
                    <ul className='flex flex-col gap-5'>
                        {MobileMenus?.map(({ name, subMenus, path, icon: Icon }: MenuItem, i: number) => {
                            const hasSubMenu = subMenus && subMenus?.length > 0;
                            return (
                                <li key={i}>
                                    <Link to={path} className='flex-center gap-2 hover:text-blue-600 transition-colors'>
                                        <Icon />
                                        <span>{name}</span>
                                        {hasSubMenu && (
                                            <ul className="pl-4">
                                                {subMenus?.map((subItem, subIndex) => (
                                                    <li key={subIndex}>{subItem.name}</li>
                                                ))}
                                            </ul>
                                        )}
                                    
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
