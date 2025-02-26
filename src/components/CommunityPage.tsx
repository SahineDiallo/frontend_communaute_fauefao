import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { HeroSection } from "./home/Hero-section";
import { StatsSection } from "./Stats-section";
import { NewsCard } from "./News-Cards";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CommunityImage from "../assets/Comunaute-de-pratique-global---.jpg";
import { Community, FilterParams } from "../types";
import { RootState } from "../store/store";
import {
  fetchCommunities,
  fetchFilteredCommunities,
  resetCommunityState,
  resetFilteredCommunities,
} from "../store/features/communities/CommunitySlice";
import { FeaturedSection } from "./Featured-section";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchCategories } from "../store/features/categories/categoriesSlice";
import { ReusableFilter } from "./Search-section";

const CommunitiesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filter values from URL
  const initialQuery = searchParams.get("query") || "";
  const initialType = searchParams.get("type") || "all";
  const initialCategory = searchParams.get("category") || "all";

  // Bundle initial filters for our reusable filter component.
  const initialFilters: FilterParams = {
    query: initialQuery,
    type: initialType,
    category: initialCategory,
  };

  // Get data from the store.
  const communities = useAppSelector((state: RootState) => state.communities.data);
  const filteredCommunities = useAppSelector((state: RootState) => state.communities.filteredData);
  const categories = useAppSelector((state: RootState) => state.categories.data);
  const status = useAppSelector((state: RootState) => state.communities.status);
  const filteredStatus = useAppSelector((state: RootState) => state.communities.filteredStatus);
  const error = useAppSelector((state: RootState) => state.communities.error);
  const filteredError = useAppSelector((state: RootState) => state.communities.filteredError);
  const featuredCommunity = useAppSelector((state: RootState) => state.communities.featuredCommunity);

  // Fetch initial data. Also, if no filter is active in the URL, clear any filtered data.
  useEffect(() => {
    dispatch(resetCommunityState());
    dispatch(fetchCommunities());
    dispatch(fetchCategories());

  }, [dispatch]);

  useEffect(()=> {
    if (!(initialQuery || initialType !== "all" || initialCategory !== "all")) {
      dispatch(resetFilteredCommunities());
    }
  }, [dispatch, initialQuery, initialType, initialCategory])

  // Determine if a filter is active by looking at the URL parameters.
  const filtersActive = initialQuery !== "" || initialType !== "all" || initialCategory !== "all";

  // Decide which list to render:
  // If filters are active, use filteredCommunities (even if it’s an empty array);
  // otherwise, show the full communities list.
  const communitiesToDisplay = filtersActive ? filteredCommunities : communities;

  // Memoize our filter change handler so that its reference stays stable.
  const handleFilterChange = useCallback(
    (filters: { query: string; type: string; category: string }) => {
      // Update URL query parameters.
      const params: Record<string, string> = {};
      if (filters.query) params.query = filters.query;
      if (filters.type && filters.type !== "all") params.type = filters.type;
      if (filters.category && filters.category !== "all") params.category = filters.category;
      setSearchParams(params);

      // If any filter is active, fetch filtered communities; else, reset.
      dispatch(fetchFilteredCommunities(filters));

    },
    [dispatch, setSearchParams]
  );

  // Split communities for layout (if needed).
  const firstThreeCommunities = communitiesToDisplay.slice(0, 3);
  const remainingCommunities = communitiesToDisplay.slice(3);

  if (status === "loading" || filteredStatus === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  if (filteredStatus === "failed") {
    return <div>Error: {filteredError}</div>;
  }

  return (
    <div>
      <HeroSection title="Communautés" />

      {/* Pass initialFilters so the filter inputs remain populated */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <ReusableFilter
          categories={categories}
          initialFilters={initialFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <section className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <Card className="border-0">
          <CardContent className="p-0">
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
          {/* Render first three communities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {firstThreeCommunities.length > 0 ? (
              firstThreeCommunities.map((community: Community) => (
                <NewsCard
                  key={community.pkId}
                  pkId={community.pkId}
                  title={community.nom}
                  description={community.description}
                  imageUrl={community.thumbnail_image}
                />
              ))
            ) : (
              filtersActive && <div>No communities found</div>
            )}
          </div>

          {/* Render featured section if available */}
          {featuredCommunity && (
            <FeaturedSection
              featuredCommunity={
                featuredCommunity
                  ? {
                      pkId: featuredCommunity.pkId,
                      title: featuredCommunity.nom,
                      description: featuredCommunity.description,
                      imageUrl: featuredCommunity.thumbnail_image,
                    }
                  : null
              }
              activities={[
                {
                  id: featuredCommunity.pkId,
                  user: {
                    name: featuredCommunity.nom,
                    avatar: featuredCommunity.thumbnail_image,
                  },
                  action: "est à la une",
                  timestamp: new Date().toLocaleDateString(),
                },
              ]}
            />
          )}

          {/* Render remaining communities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingCommunities.map((community: Community) => (
              <NewsCard
                key={community.pkId}
                pkId={community.pkId}
                title={community.nom}
                description={community.description}
                imageUrl={community.thumbnail_image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunitiesPage;
