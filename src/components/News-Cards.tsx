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
  categories: Category[]; // Add categories prop
}

export function NewsCard({ pkId, title, description, imageUrl, categories }: NewsCardProps) {
  return (
    <Card className="overflow-hidden rounded-none">
      <div className="relative h-48 md:h-64">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-full"
        />
      </div>

      <CardHeader className="px-0">
        {categories && categories.length > 0 && (
          <div className="mt-0">
            <span className="text-sm text-muted-foreground"></span>
            {categories.map(cat => (
              <span key={cat.pkId} className='text-sm'>{cat.nom} </span>
            ))}
          </div>
        )}
        <Link to={`/communaute-details/${pkId}`} className="h3 hover:text-primary text-xl font-semibold leading-tight transition-colors">
            {title}
        </Link>
      </CardHeader>
      <CardContent className='px-0'>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
}