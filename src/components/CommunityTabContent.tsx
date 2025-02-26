import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import Skeleton from './skeleton/Skeleton';
import { ActivityItem } from './ActivityItem';
import TabContent from './tabContent';
import { ActivityItemProps } from '../types';



const CommunityTabContent = () => {
  const { pkId, tab } = useParams<{ pkId: string; tab: string }>(); 
  const [communityData, setCommunityData] = useState<string | null>(null);;
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [fetchingTab, setFetchingTab] = useState<string | null>(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const domain = import.meta.env.VITE_MAIN_DOMAIN
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
  } | null>(null);
  const { data: community } = useAppSelector((state) => state.communityDetails);

  const fetchTabData = async (tab: string, pkId: string) => {
    const domain = import.meta.env.VITE_MAIN_DOMAIN;
    let url = '';
    switch (tab) {
      case 'membres':
        url = `${domain}/api/community-members/${pkId}/`;
        break;
      case 'discussions':
        url = `${domain}/api/discussions/?communaute_id=${pkId}`;
        break;
      case 'ressources':
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
    if (!pkId || !tab) return;

    setLoadingState(true);
    setCommunityData(null);
    setErrorState(null);
    setPagination(null);
    setFetchingTab(tab)
    const fetchDataForTab = async () => {
      try {
        const response = await fetchTabData(tab, pkId);
        setCommunityData(response);
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
      }
    };

    if (tab === 'a-propos') {
      setLoadingState(false);
      setCommunityData(community?.description || null);
    } else {
      fetchDataForTab();
    }
  }, [pkId, tab, community?.description]);

  useEffect(() => {
    fetch(`${domain}api/recent-activities/?community_id=${community?.pkId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("this is the activities for community details", data)
        setRecentActivities(data)});
  }, [community?.pkId, domain]);

  if (!pkId || !tab) {
    return <div>Invalid URL parameters.</div>; // Or redirect to a default page
  }

  return (
    <>
      <div className="bg-gray-100 md:p-4">
        <div className="container mx-auto px-1 mt-3 md:mt-0 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Column (col-md-4) */}
          <div className="md:col-span-4 bg-white p-4 shadow">
            <div className="mb-3">
              <h2 className="text-lg custom-header">Activités Récentes</h2>
              {recentActivities.map((activity: ActivityItemProps, i) => (
                <ActivityItem
                  key={i}
                  user={activity.user}
                  action={activity.action}
                  discussion={activity?.discussion}
                  fichier={activity?.fichier}
                  community={activity.community}
                />
              ))}
            </div>
            <div className="mb-3">
              <h2 className="text-lg custom-header">Administrateurs</h2>
            </div>
          </div>

          {/* Right Column (col-md-8) */}
          <div className="md:col-span-8 bg-white p-4 shadow">
            <h2 className="text-xl font-medium custom-header">{tab.toUpperCase()}</h2>
            {fetchingTab !== tab ? ( // Only render if the fetching tab matches the active tab
            <Skeleton />
          ) : loadingState ? (
            <Skeleton />
          ) : errorState ? (
            <p>Error: {errorState}</p>
          ) : (
            <TabContent
              tab={tab}
              data={communityData}
              loading={loadingState}
              pagination={pagination}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              communityPkId={pkId}
            />
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityTabContent;