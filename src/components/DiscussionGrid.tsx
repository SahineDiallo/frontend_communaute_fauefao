import DOMPurify from 'dompurify';
import { MessageSquare } from 'lucide-react'; // Import icons// Import your Button component
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Button } from './ui/Button';

  interface BlogPostProps {
    title: string;
    author?: string;
    date: string;
    excerpt: string;
    commentCount?: number;
    pkId: string;
  }
  
  // Helper function to format the date
  function formatDateToFrench(dateString: string): string {
    const date = new Date(dateString);
  
    // Define options with the correct type
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', // "Thu"
      day: '2-digit',   // "06"
      month: '2-digit', // "04"
      year: 'numeric',  // "2023"
      hour: '2-digit',  // "19"
      minute: '2-digit', // "31"
      hour12: false,     // Use 24-hour format
    };
  
    // Format the date in French locale
    const formattedDate = date.toLocaleString('fr-FR', options);
  
    // Replace the default separator with " - "
    return formattedDate.replace(/\s/, ' - ');
  }

  
  // Helper function to truncate HTML content to 4 lines
  const truncateExcerpt = (html: string, maxLength: number = 200) => {
    // Create a temporary element to parse the HTML
    const div = document.createElement('div');
    div.innerHTML = html;
  
    // Function to recursively truncate the content
    const truncateNode = (node: ChildNode, remainingLength: number): number => {
      if (remainingLength <= 0) return 0;
  
      if (node.nodeType === Node.TEXT_NODE) {
        // Truncate text nodes
        const text = node.textContent || '';
        if (text.length > remainingLength) {
          node.textContent = text.slice(0, remainingLength) + '...';
          return 0; // No remaining length after truncation
        }
        return remainingLength - text.length;
      }
  
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Process child nodes for element nodes
        for (let i = 0; i < node.childNodes.length; i++) {
          remainingLength = truncateNode(node.childNodes[i], remainingLength);
          if (remainingLength <= 0) break;
        }
      }
  
      return remainingLength;
    };
  
    // Start truncating from the root element
    truncateNode(div, maxLength);
  
    // Return the truncated HTML
    return div.innerHTML;
  };
  
  export function DiscussionPost({ title, author, date, excerpt, commentCount = 0, pkId }: BlogPostProps) {
    // Sanitize and truncate the excerpt
    const sanitizedExcerpt = DOMPurify.sanitize(truncateExcerpt(excerpt));
  
    return (
      <article className="py-5 border-b border-gray-200">
        <div className="relative">
          {/* Comment count badge */}
          <div className="absolute right-0 top-0 flex items-center gap-2 text-[#e86928]">
            <MessageSquare className="w-5 h-5" />
            <span>
              {commentCount} comment{commentCount !== 1 ? 's' : ''}
            </span>
          </div>
  
          {/* Title */}
          <h6 className="text-xl font-medium text-[#e86928] mb-1 pr-32">{title}</h6>
  
          {/* Author and date */}
          <div className="text-gray-600 mb-4" style={{fontWeight: 100, fontStyle: "Italic"}}>
            {'Ajouter par '}
            <span className="text-[#e86928]">{author || 'Anonymous'}</span>
            {' le '}
            {formatDateToFrench(date)}
          </div>
  
          {/* Excerpt (sanitized and truncated) */}
          <div
            className="text-gray-700 mb-6 line-clamp-3" // Tailwind's line-clamp for truncation
            dangerouslySetInnerHTML={{ __html: sanitizedExcerpt }} // Safely render HTML
          />
  
          {/* Read more button */}
          <Button asChild className="bg-[#e86928] hover:bg-[#d25a1f] text-white">
            <Link to={`/discussions/${pkId}`}>Lire plus</Link>
          </Button>
        </div>
      </article>
    );
  }