import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Users, Handshake, FileText, Globe } from "lucide-react" // Importez les icônes nécessaires
import { Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../store/store";





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

    const featuredCommunity = useAppSelector((state: RootState) => state.communities.featuredCommunity);
    console.log(`Freature community ===> ${featuredCommunity?.categories.length}`);


 
  return (
    <Card className="bg-red-50">
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

        {/* Section verticale avec icônes  cvolor: rgb(239,132,80) */}
        <div className="border-t border-gray-300 pt-5">
      <div className="flex flex-col space-y-4">
        {/* Lien pour les Communautés */}
        <Link to="/communities" className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <Globe className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
          <span className="text-md text-muted-foreground">10 Communautés</span>
        </Link>

        {/* Lien pour les Membres */}
        <Link to="/members" className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <Users className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
          <span className="text-md text-muted-foreground">33 Membres</span>
        </Link>

        {/* Lien pour les Partenaires */}
        <Link to="/partners" className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <Handshake className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
          <span className="text-md text-muted-foreground">9 Partenaires</span>
        </Link>

        {/* Lien pour les Ressources */}
        <Link to="/resources" className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <FileText className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
          <span className="text-md text-muted-foreground">25 Ressources</span>
        </Link>
      </div>
    </div>
      </CardContent>
    </Card>
  )
}