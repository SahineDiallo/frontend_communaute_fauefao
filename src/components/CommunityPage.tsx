import { HeroSection } from "./home/Hero-section";
import { SearchSection } from "./Search-section";
import { StatsSection } from "./Stats-section";
import { NewsCard } from "./News-Cards";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CommunityImage from "../assets/Comunaute-de-pratique-global---.jpg"
import { useEffect } from "react";
import { Community } from "../types";
import { RootState } from "../store/store";
import { fetchCommunities, resetCommunityState } from "../store/features/communities/CommunitySlice";
import { FeaturedSection } from "./Featured-section";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";


const CommunitiesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const communities = useAppSelector((state: RootState) => state.communities.data);
  const status = useAppSelector((state: RootState) => state.communities.status);
  const error = useAppSelector((state: RootState) => state.communities.error);
  // Split communities into groups
  const firstThreeCommunities = Array.isArray(communities) ? communities.slice(0, 3) : [];
  const remainingCommunities = Array.isArray(communities) ? communities.slice(3) : [];
  const featuredCommunity = useAppSelector((state: RootState) => state.communities.featuredCommunity);


  const activities = featuredCommunity
    ? [
        {
          id: featuredCommunity.pkId,
          user: {
            name: featuredCommunity.nom,
            avatar: featuredCommunity.thumbnail_image,
          },
          action: 'est à la une',
          timestamp: new Date().toLocaleDateString(),
        },
      ]
    : [];

  // Prepare data for FeaturedSection
  const featuredArticleProps = featuredCommunity
    ? {
        date: new Date().toISOString(), // Use current date for the featured article
        title: featuredCommunity.nom,
        description: featuredCommunity.description,
        imageUrl: featuredCommunity.thumbnail_image,
      }
    : null;
  
    useEffect(() => {
      dispatch(resetCommunityState());
      dispatch(fetchCommunities());
    }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <div>

      <HeroSection title="Communautés" />
        
      <SearchSection />
      
      <section className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <Card className="border-0">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <CardHeader className="p-0">
                  <CardTitle className="text-3xl md:text-4xl mb-4">
                    Nos communautés de pratiques
                  </CardTitle>
                </CardHeader>
                <p className="text-muted-foreground">
                  Nos communautés de pratiques rassemblent des acteurs variés pour renforcer l'autonomisation économique des femmes en Afrique de l'Ouest
                </p>
              </div>
              <div className="relative aspect-[4/3]">
                <img
                  src={CommunityImage}
                  alt="Community"
                  className="object-cover rounded-0"
                />
                <StatsSection />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          {/* Render first 3 communities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firstThreeCommunities.map((community: Community) => (
              <NewsCard
                key={community.pkId}
                pkId={community.pkId}
                title={community.nom}
                description={community.description}
                imageUrl={community.thumbnail_image}
                categories={community.categories}
              />
            ))}
          </div>
          
          <div className="">
            {/* Render FeaturedSection */}
            {featuredCommunity && (
              <FeaturedSection
                featuredCommunity={featuredArticleProps!}
                activities={activities}
              />
            )}
          </div>

          {/* Render remaining communities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remainingCommunities.map((community: Community) => (
              <NewsCard
                key={community.pkId}
                pkId={community.pkId}
                title={community.nom}
                description={community.description}
                imageUrl={community.thumbnail_image}
                categories={community.categories}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


export default CommunitiesPage;

