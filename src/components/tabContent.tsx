import { Discussion, File, Membership, TabContentProps, TabData } from '../types';
import { DiscussionPost } from './DiscussionGrid';
import { MemberGrid } from './MemberGrid';
import Skeleton from './skeleton/Skeleton'; // Import the Skeleton component

const TabContent = ({
  tab,
  data,
  loading,
  pagination,
  onNextPage,
  onPreviousPage,
}: TabContentProps) => {
  console.log("here is the data", data)
  console.log("pagination", pagination);
  console.log("onNextPage", onNextPage);
  console.log("onPreviousPage", onPreviousPage);
  
  if (loading) {
    return <Skeleton />; // Show the Skeleton component while loading
  }

  if (!data) {
    return <p>No data available for this tab.</p>; // Handle no data
  }

  if (tab !== 'À Propos' && (typeof data !== 'object' || data === null || !('results' in data))) {
    return <p>No data available for this tab.</p>;
  }
  switch (tab) {
    case 'À Propos':
      return <p>{data as string}</p>; // Render the community description
    case 'Membres':
      return (
        <div>
          {
            (data as TabData).results?.length === 0 ? ( // Check if results are empty
              <p>Devenez le premier Membre de cette communauté</p> // Display message if no discussions
            ) :
            <MemberGrid members={(data as TabData).results as Membership[]} />
          }
        </div>
      );
    case 'Discussions':
      return (
        <div>
          {(data as TabData).results?.length === 0 ? ( // Check if results are empty
            <p>Pas de discussions trouvées</p> // Display message if no discussions
          ) : (
            ((data as TabData).results as Discussion[]).map((discussion) => (
              <DiscussionPost
                key={discussion.pkId}
                title={discussion.titre}
                author={
                  discussion.auteur?.first_name && discussion.auteur?.last_name
                    ? `${discussion.auteur.first_name} ${discussion.auteur.last_name}` // Combine first and last name
                    : discussion.auteur?.first_name || discussion.auteur?.last_name || 'Anonymous' // Fallback to first name, last name, or 'Anonymous'
                }
                date={discussion.date_creation}
                excerpt={discussion.contenu} // Use the full content or truncate it for an excerpt
                commentCount={discussion.commentCount || 0} // Replace with actual comment count if available
                pkId={discussion.pkId}
              />
            ))
          )}
        </div>
      );
    case 'Ressources':
      return (
        <div>
          <h3>Fichier Partager</h3>
          <ul>
            {((data as TabData).results as File[]).map((file) => (
              <li key={file.pkId}>
                <a href={file.fichier} target="_blank" rel="noopener noreferrer">
                  {file.nom}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return <p>No data available for this tab.</p>;
  }
};

export default TabContent;