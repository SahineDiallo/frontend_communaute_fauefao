import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import { ShareIcon } from 'lucide-react';

const SocialShareDropdown = () => {
  const currentPageUrl = window.location.href;
  const pageTitle = document.title;

  return (
    <Menu as="div" className="relative inline-block text-right">
      {/* Dropdown Button */}
      <div>
        <Menu.Button className="inline-flex justify-center bg-[#1f7e60] px-6 py-3 text-sm font-medium text-white bg-primary rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
            <ShareIcon className='h-5 w-5 mr-2' />
            Partager
        </Menu.Button>
      </div>

      {/* Dropdown Items */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-2">
            {/* Facebook Share */}
            <Menu.Item>
              {({ active }) => (
                <FacebookShareButton
                  url={currentPageUrl}
                  title={pageTitle}
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm mb-3`}
                >
                  <FacebookIcon size={24} round className="mr-2" />
                  Facebook
                </FacebookShareButton>
              )}
            </Menu.Item>

            {/* Twitter Share */}
            <Menu.Item>
              {({ active }) => (
                <TwitterShareButton
                  url={currentPageUrl}
                  title={pageTitle}
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm mb-3`}
                >
                  <TwitterIcon size={24} round className="mr-2" />
                  Twitter
                </TwitterShareButton>
              )}
            </Menu.Item>

            {/* LinkedIn Share */}
            <Menu.Item>
              {({ active }) => (
                <LinkedinShareButton
                  url={currentPageUrl}
                  title={pageTitle}
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm mb-3`}
                >
                  <LinkedinIcon size={24} round className="mr-2" />
                  LinkedIn
                </LinkedinShareButton>
              )}
            </Menu.Item>

            {/* WhatsApp Share */}
            <Menu.Item>
              {({ active }) => (
                <WhatsappShareButton
                  url={currentPageUrl}
                  title={pageTitle}
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm mb-3`}
                >
                  <WhatsappIcon size={24} round className="mr-2" />
                  WhatsApp
                </WhatsappShareButton>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SocialShareDropdown;