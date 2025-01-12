import { Card, CardContent, CardHeader } from "../components/ui/card"

interface NewsCardProps {
  date: string
  title: string
  description: string
  imageUrl: string
}

export function NewsCard({ date, title, description, imageUrl }: NewsCardProps) {
  return (
    <Card className="overflow-hidden rounded-none">
      <div className="relative h-48 md:h-64">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-full"
        />
      </div>
      <CardHeader className="space-y-1">
        <div className="text-sm text-muted-foreground">{date}</div>
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  )
}

