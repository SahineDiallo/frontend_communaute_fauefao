import { Link } from "react-router-dom"
import { formatIsoDate } from "../lib/utils"
import { Membership } from "../types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
// import { Card, CardContent } from "./ui/card"



interface MemberGridProps {
  members: Membership[]
}

export function MemberGrid({ members }: MemberGridProps) {
  const domain = import.meta.env.VITE_MAIN_DOMAIN
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {members.map((member) => (
        // <Card key={member.user.pkId} className="overflow-hidden">
        //   <CardContent className="p-4">
        //     <div className="flex items-center gap-4">
        //       <Avatar className="h-12 w-12">
        //         <AvatarImage src={member.user.profile.image_url} alt={member.user.full_name} />
        //         <AvatarFallback>{member.user.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
        //       </Avatar>
        //       <div className="flex-1 min-w-0">
        //         <div className="flex items-center justify-between">
        //           <p className="text-sm font-medium text-primary truncate">{member.user.full_name}</p>
        //         </div>
        //         <p className="text-xs text-muted-foreground">Membre depuis: {formatIsoDate(member.date_joined)}</p>
        //       </div>
        //     </div>
        //   </CardContent>
        // </Card>
            <div key={member.user.pkId} className="border border-[#ef8450] p-4 flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-none">
                {
                  member.user.profile.image_url ? (
                    <AvatarImage className="bg-[#f2f2f3]" src={`${domain}${member.user.profile.image_url}`} alt={member.user.full_name} />
                  ) : (
                    <AvatarFallback className="rounded-none">{member.user.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  )
                }
                
              </Avatar>
            <div>
              <h3 className="text-[#ef8450] underline-none font-medium hover:underline mb-1">
                <Link to="#">{member.user.full_name}</Link>
              </h3>
              <p className="text-sm text-gray-500">Membre depuis: {formatIsoDate(member.date_joined)}</p>
              <p className="text-sm text-gray-600">Bangladesh</p>
            </div>
          </div>
      ))}
    </div>
  )
}