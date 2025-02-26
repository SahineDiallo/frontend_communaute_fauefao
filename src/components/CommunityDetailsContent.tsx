import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectActiveTab } from '../store/features/tabs/tabsSelectors';
import Skeleton from './skeleton/Skeleton';
import { ActivityItemProps, Community } from '../types';
import { ActivityItem } from './ActivityItem';
import TabContent from './tabContent';

interface CommunityDetailContentProps {
  community: Community;
}

const CommunityDetailContent = ({ community }: CommunityDetailContentProps) => {
  const activeTab = useAppSelector(selectActiveTab);
  const [communityData, setCommunityData] = useState<string | null>(null);
  const domain = import.meta.env.VITE_MAIN_DOMAIN
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
  } | null>(null);
  const [fetchingTab, setFetchingTab] = useState<string | null>(null);


  const handleNextPage = async () => {
    if (!pagination?.next) return;
  
    setLoadingState(true);
    try {
      const response = await fetch(pagination.next);
      if (!response.ok) {
        throw new Error('Failed to fetch next page');
      }
      const data = await response.json();
      setCommunityData(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setLoadingState(false);
    }
  };
  
  const handlePreviousPage = async () => {
    if (!pagination?.previous) return;
  
    setLoadingState(true);
    try {
      const response = await fetch(pagination.previous);
      if (!response.ok) {
        throw new Error('Failed to fetch previous page');
      }
      const data = await response.json();
      setCommunityData(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (error) {
      console.error('Error fetching previous page:', error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    setLoadingState(true);
    setCommunityData(null); // Reset communityData when the tab changes
    setErrorState(null);
    setPagination(null); 
    setFetchingTab(activeTab);
    const fetchTabData = async (tab: string, pkId: string) => {
      let url = '';
      switch (tab) {
        case 'Membres':
          url = `${domain}/api/community-members/${pkId}/`;
          break;
        case 'Discussions':
          url = `${domain}/api/discussions/?communaute_id=${pkId}`;
          break;
        case 'Ressources':
          url = `${domain}/api/fichiers/?communaute_id=${pkId}`;
          break;
        default:
          throw new Error(`Unknown tab: ${tab}`);
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    };
    const fetchDataForTab = async (tab: string) => {
      if (!tab || !community?.pkId) return;
  
      try {
        const response = await fetchTabData(tab, community.pkId);
        setCommunityData(response); // Store the results array
        setPagination({
          count: response.count,
          next: response.next,
          previous: response.previous,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorState(error.message);
        } else if (typeof error === 'string') {
          setErrorState(error);
        } else {
          setErrorState('An unknown error occurred');
        }
      } finally {
        setLoadingState(false);
        // setFetchingTab(null);
      }
    };
  
    if (activeTab === 'À Propos') {
      setLoadingState(false);
      setCommunityData(community.description);
    } else {
      fetchDataForTab(activeTab);
    }
  }, [activeTab, community?.pkId, community.description, domain]);
  
  
  const recentActivities: ActivityItemProps[] = [  


  ]

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column (col-md-4) */}
        <div className="md:col-span-4 bg-white p-4 shadow">
          <div className='mb-3'>
            <h2 className="text-lg custom-header">Activités Récentes</h2>
            {recentActivities.map((activity, i) => (
                  <ActivityItem key={i} {...activity} />
            ))}
          </div>
          <div className='mb-3'>
          <h2 className="text-lg custom-header">Administrateurs</h2>
          </div>

        </div>

        {/* Right Column (col-md-8) */}
        <div className="md:col-span-8 bg-white p-4 shadow">
          <h2 className="text-lg font-semibold custom-header">{activeTab}</h2>
          {fetchingTab !== activeTab ? ( // Only render if the fetching tab matches the active tab
            <Skeleton />
          ) : loadingState ? (
            <Skeleton />
          ) : errorState ? (
            <p>Error: {errorState}</p>
          ) : (
            <TabContent
              tab={activeTab}
              data={communityData}
              loading={loadingState}
              pagination={pagination}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              communityPkId={community.pkId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailContent;