import React, { useEffect } from 'react';
import { X } from 'lucide-react'; // Import the close icon

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Prevent closing the modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault(); // Prevent default Escape behavior
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl overflow-y-auto md:w-3/4 md:max-h-[90vh] md:rounded-lg">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" /> {/* Close icon */}
          </button>
        </div>
        <div className="p-6">
          {children} {/* Render the form inside the modal */}
        </div>
      </div>
    </div>
  );
};

export default Modal;