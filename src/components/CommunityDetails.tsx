import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import MenuPageDetail from './MenuPageDetail';
import { DetailPageMenuItems } from '../utils/Menus';
import { fetchCommunityDetails } from '../store/features/communities/CommunityDetailsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import CommunityTabContent from './CommunityTabContent';

const CommunityDetails = () => {
  const { pkId } = useParams<{ pkId: string }>();
  const dispatch = useAppDispatch();
  const { data: community, status, error } = useAppSelector((state) => state.communityDetails);

  useEffect(() => {
    if (pkId) {
      dispatch(fetchCommunityDetails(pkId));
    }
  }, [pkId, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#ffcaa1] to-white-500">
        <div className="container mx-auto md:px-4">
          <div className="w-full">
            <img src={community.banner_image} alt="" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
      <div className="communaute-header-info container w-full mx-auto px-1 md:px-8 py-2 md:py-4">
        <div className="border-b-2 border-gray-100 pb-4">
          <h1 className="h1">{community.nom}</h1>
          <span className="text-gray-500">
            
            {
              (community?.categories?.length) && (community.categories.map((cat) => cat.nom).join(', '))
            }
          </span>
        </div>
        <MenuPageDetail MenuItems={DetailPageMenuItems} communityPkId={community.pkId} />
      </div>
      <CommunityTabContent />
    </>
  );
};

export default CommunityDetails;