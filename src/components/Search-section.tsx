import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"

export function SearchSection() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search News"
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="articles">Articles</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="community">Community</SelectItem>
            <SelectItem value="events">Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
