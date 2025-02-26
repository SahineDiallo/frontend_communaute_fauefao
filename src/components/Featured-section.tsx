import { Link } from "react-router-dom";
import { ActivityFeed } from "./ActivityFeed";
import { ActivityItem } from "./ActivityFeed"; // Import the ActivityItem type
import { Card, CardContent } from "./ui/card";

export interface FeaturedArticleProps {
  pkId: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturedSectionProps {
  featuredCommunity: FeaturedArticleProps | null;
  activities: ActivityItem[];
}

export function FeaturedSection({ featuredCommunity, activities }: FeaturedSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Featured Article (2/3 width) */}
      <div className="md:col-span-2">
        <Card className="overflow-hidden rounded-none">
          <div className="relative aspect-[16/10] md:aspect-[16/9]">
          <Link to={`/communaute-details/${featuredCommunity?.pkId}/a-propos`}>
            <img
              src={featuredCommunity?.imageUrl}
              alt={featuredCommunity?.title}
              className="object-cover w-full h-full"
            />
            </Link>
          </div>
          <CardContent className="px-0 py-4">
            <Link to={`/communaute-details/${featuredCommunity?.pkId}/a-propos`}>
              <h2 className="text-2xl font-semibold mb-3">{featuredCommunity?.title}</h2>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{featuredCommunity?.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed (1/3 width) */}
      <div className="md:col-span-1">
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}