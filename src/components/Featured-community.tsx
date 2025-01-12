import { Card, CardContent } from "../components/ui/card"
import { formatDate } from "../lib/utils"


interface FeaturedArticleProps {
  date: string
  title: string
  description: string
  imageUrl: string
}

export function FeaturedArticle({ date, title, description, imageUrl }: FeaturedArticleProps) {
  return (
    <Card className="overflow-hidden rounded-none">
      <div className="relative aspect-[16/10] md:aspect-[16/9]">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-2">
          {formatDate(date)}
        </div>
        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
