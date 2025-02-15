import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react'; // Import icons // Adjust the import path
import { InputWithIcon } from '../ui/InputWithIcon';
import RichTextEditor from '../ui/RichTextEditor';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface DiscussionFormProps {
  onClose: (new_obj?: { new_obj: boolean }) => void;
  tempFiles: string[];
  onTempFileUpload?: (tempFilePath: string) => void; // Callback for temporary file uploads
  resetFiles: () => void;
}

interface Errors {
  titre?: string; // Optional error message for the title field
  contenu?: string; // Optional error message for the content field
  backend?: string; // Optional error message for backend errors
  headlineDescription?: string;
}


const DiscussionForm: React.FC<DiscussionFormProps> = ({
  onClose,
  onTempFileUpload,
  tempFiles,
  resetFiles
}) => {
  const [formData, setFormData] = useState({
    titre: '',
    headlineDescription: "",
    contenu: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const { pkId } = useParams<{ pkId: string }>();

  const validateForm = () => {
    const newErrors: {titre?: string, contenu?: string}  = {};
    if (!formData.titre) newErrors.titre = 'Un titre est requis';
    if (!formData.contenu) newErrors.contenu = 'Contenu est un champs requis';
    if (!formData.headlineDescription) newErrors.contenu = 'Résumé est un champs requis';
    setErrors(newErrors);


    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors when the user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const handleEditorChange = (content: string) => {
    setFormData({
      ...formData,
      contenu: content,
    });
    // Clear errors when the user starts typing
    setErrors({
      ...errors,
      contenu: '',
    });
  };
  const handleEditorDescChange = (content: string) => {
    setFormData({
      ...formData,
      headlineDescription: content,
    });
    // Clear errors when the user starts typing
    setErrors({
      ...errors,
      headlineDescription: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
    console.log("here is the form data", formData);
    const token = localStorage.getItem("token");
    try {
      // Send data to the backend using fetch
      const response = await fetch('http://localhost:8000/api/discussions/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titre: formData.titre,
          contenu: formData.contenu,
          communaute: pkId, // Replace with the actual communaute UUID
          fichierIds: tempFiles,
          headlineDescription: formData.headlineDescription
        }), // Convert form data to JSON
      });
  
      if (!response.ok) {
        // Handle backend errors
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create discussion.');
      }
  
      const data = await response.json(); // Parse the JSON response
      toast.success('Discussion créée avec succès !')
      resetFiles();
      onClose({new_obj: true}); // Close the form (if needed)
      console.log('Discussion created:', data);
    } catch (error) {
      console.error('Error creating discussion:', error);
      // Display error message to the user
      if (error instanceof Error) {
        setErrors({
          ...errors,
          backend: error.message || 'Failed to create discussion. Please try again.',
        });
      } else {
        // Handle cases where the error is not an Error object
        setErrors({
          ...errors,
          backend: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Titre Field */}
      <InputWithIcon
        icon={<MessageSquare className="h-5 w-5 text-gray-400" />}
        label="Titre"
        name="titre"
        value={formData.titre}
        onChange={handleChange}
        required
      />
      <div>
        <label htmlFor="contenu" className="block text-sm font-medium text-gray-700 mb-1">
          Résumé de la discussion
        </label>
        <RichTextEditor
          content={formData.headlineDescription}
          onChange={handleEditorDescChange}
          onTempFileUpload={onTempFileUpload}
          textOnly = {true}
        />
        {errors.headlineDescription && <p className="text-red-500 text-sm mt-1">{errors.headlineDescription}</p>}
      </div>
      {/* Contenu Field */}
      <div>
        <label htmlFor="contenu" className="block text-sm font-medium text-gray-700 mb-1">
          Contenu
        </label>
        <RichTextEditor
          content={formData.contenu}
          onChange={handleEditorChange}
          onTempFileUpload={onTempFileUpload}
        />
        {errors.contenu && <p className="text-red-500 text-sm mt-1">{errors.contenu}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => onClose()}
          className="inline-flex justify-center rounded-0 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-0 border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ajouter discussion
        </button>
      </div>
    </form>
  );
};

export default DiscussionForm;