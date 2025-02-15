/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/card';

export interface Category {
  pkId: string,
  nom: string,
  description: string
}
interface NewsCardProps {
  pkId: string,
  title: string;
  description: string;
  imageUrl: string;
}

export function NewsCard({ pkId, title, description, imageUrl }: NewsCardProps) {
  return (
    <Card className="overflow-hidden rounded-none shadow-none">
      <div className="relative h-48 md:h-64">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-full"
        />
      </div>

      <CardHeader className="p-0 mt-2 mb-3">
        {/* {categories && categories.length > 0 && (
          <div className="mt-0">
            <span className="text-sm text-muted-foreground"></span>
            {categories.map(cat => (
              <span key={cat.pkId} className='text-sm'>{cat.nom} </span>
            ))}
          </div>
        )} */}
        <Link to={`/communaute-details/${pkId}/a-propos`} className="h4 hover:text-primary/2 text-md font-normal leading-tight transition-colors mb-0 text-black">
            {title}
        </Link>
      </CardHeader>
      <CardContent className='px-0'>
        <p className="text-muted-foreground line-clamp-4 font-extralight text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}