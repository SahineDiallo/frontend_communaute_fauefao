import { formatIsoDate } from "../lib/utils"
import { Membership } from "../types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"



interface MemberGridProps {
  members: Membership[]
}

export function MemberGrid({ members }: MemberGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {members.map((member) => (
        <Card key={member.user.pkId} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.user.profile.image_url} alt={member.user.full_name} />
                <AvatarFallback>{member.user.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary truncate">{member.user.full_name}</p>
                </div>
                <p className="text-xs text-muted-foreground">Membre depuis: {formatIsoDate(member.date_joined)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}