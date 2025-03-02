import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, Group, FileText, MessageCircle } from "lucide-react"; // Updated icon imports
import { Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../store/store";
import { useState, useEffect } from 'react';
import { CommunauteDetailsCount } from "../models/CommunityType";

import { fetchCommunauteDetailsCount } from "../services/CommunityServices";






export interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
  }
  action: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {

    const [communitydetailsCount, setCommunitydetailsCount] = useState<CommunauteDetailsCount>();

    const featuredCommunity = useAppSelector((state: RootState) => state.communities.featuredCommunity);
    const frontendUrl = import.meta.env.VITE_FRONTENT_URL;


    console.log(frontendUrl);


   useEffect(() => {
      const loadCommunauteDetailsCount = async () => {
        const data = await fetchCommunauteDetailsCount(featuredCommunity?.pkId);
        setCommunitydetailsCount(data);
      };
      loadCommunauteDetailsCount();
    }, []);

    

    console.log(communitydetailsCount);
  


 
  return (
    <Card >
      <CardHeader>
        <CardTitle>La communauté à la une</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium text-primary">{activity.user.name}</span>
                {' '}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}

          {/* Section verticale avec icônes  color: rgb(239,132,80)  all-institutions */}
          <div className="border-t border-gray-300 pt-5">
  <div className="flex flex-col space-y-4">
    {/* Lien pour les Membres */}
    <Link to={`${frontendUrl}/communaute-details/${featuredCommunity?.pkId}/membres`} className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
      <Users className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
      <span className="text-md text-muted-foreground">{communitydetailsCount?.membres} Membres</span>
    </Link>

    {/* Lien pour les Partenaires */}
    <Link to={`${frontendUrl}/all-institutions`} className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
      <Group className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
      <span className="text-md text-muted-foreground">{communitydetailsCount?.institutions} Partenaires</span>
    </Link>

    {/* Lien pour les Ressources */}
    <Link to={`${frontendUrl}/communaute-details/${featuredCommunity?.pkId}/ressources`} className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
      <FileText className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
      <span className="text-md text-muted-foreground">{communitydetailsCount?.ressources} Ressources</span>
    </Link>

    {/* Lien pour les Discussions */}
    <Link to={`${frontendUrl}/communaute-details/${featuredCommunity?.pkId}/discussions`} className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
      <MessageCircle className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
      <span className="text-md text-muted-foreground">{communitydetailsCount?.discussions} Discussions</span>
    </Link>
  </div>
</div>

      </CardContent>
    </Card>
  )
}