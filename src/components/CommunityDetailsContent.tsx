/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectActiveTab } from '../store/features/tabs/tabsSelectors';
import Skeleton from './skeleton/Skeleton';


const fetchTabData = async (params: { tab: string }) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/jewelery`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const CommunityDetailContent = () => {
  const activeTab = useAppSelector(selectActiveTab);
  // Local state for handling the data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [communityData, setCommunityData] = useState<any>(null); // State for the fetched data
  const [loadingState, setLoadingState] = useState<boolean>(false); // Loading state
  const [errorState, setErrorState] = useState<string | null>(null); // Error state
  
  const fetchDataForTab = async (tab: string) => {
    if (!tab) return;
  
    setLoadingState(true);
    setErrorState(null); // Reset error state before fetching
  
    try {
      const data = await fetchTabData({ tab });
      setCommunityData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // If the error is an instance of Error, use its message
        setErrorState(error.message);
      } else if (typeof error === "string") {
        // If the error is a string, use it directly
        setErrorState(error);
      } else {
        // For other cases, set a generic error message
        setErrorState("An unknown error occurred");
      }
    } finally {
      setLoadingState(false);
    }
  };
  
  useEffect(()=> {
    setLoadingState(true)
    fetchDataForTab(activeTab);
  }, [activeTab])
  
  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column (col-md-4) */}
        <div className="md:col-span-4 bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">Left Column</h2>
          <p>This is the left column content.</p>
        </div>

        {/* Right Column (col-md-8) */}
        <div className="md:col-span-8 bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">{activeTab}</h2>
            {
              loadingState ? (<Skeleton />) : 
              <p>
                We got some data back
              </p>
            }
        </div>
      </div>
    </div>
  );
}; 

export default CommunityDetailContent;
