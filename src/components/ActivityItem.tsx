import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

interface ActivityItemProps {
  user: {
    name: string
    image?: string
  }
  action: string
  date: string
}

export function ActivityItem({ user, action, date }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium text-orange-500">{user.name}</span> {action}
        </p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  )
}