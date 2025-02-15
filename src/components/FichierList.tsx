import React from "react";

type Fichier = {
  pkId: string;
  nom: string;
  fichier: string;
};

type FichiersListProps = {
  fichiers: Fichier[];
};

const FichiersList: React.FC<FichiersListProps> = ({ fichiers }) => {
  const baseURL = import.meta.env.VITE_MAIN_DOMAIN; // Make sure to add this in your .env file

  return (
    <div>
      <ul className="list-disc list-inside list-unstyled">
        {fichiers.map((fichier) => (
          <li key={fichier.pkId} className="mb-2">
            <a
              href={`${baseURL}${fichier.fichier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {fichier.nom}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FichiersList;
