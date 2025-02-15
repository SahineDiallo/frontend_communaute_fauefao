import DOMPurify from 'dompurify';
import { MessageSquare } from 'lucide-react'; // Import icons// Import your Button component
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { Button } from './ui/Button';

interface DiscussionPostProps {
  title: string;
  author?: string;
  date: string;
  excerpt?: string;
  headlineDescription: string;
  commentCount?: number;
  pkId: string; // Post ID
  communityPkId: string; // Community ID
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
  const truncateExcerpt = (html: string, maxLength: number = 300) => {
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
  
  export function DiscussionPost( {title,
    author,
    date,
    excerpt,
    commentCount = 0,
    pkId,
    headlineDescription,
    communityPkId, // Add communityPkId to props
  }: DiscussionPostProps) {
    const contentToRender = excerpt ? excerpt : headlineDescription;
    const navigate = useNavigate();
    console.log("headline", headlineDescription)
    // Function to handle the "Lire plus" button click
    const handleReadMoreClick = () => {     // Navigate to the post details page
      navigate(`/communities/${communityPkId}/posts/${pkId}`);
      // Force a page refresh
      window.location.reload();
    };

    // Sanitize and truncate the content
    const sanitizedContent = DOMPurify.sanitize(truncateExcerpt(contentToRender, 300), {
      ALLOWED_TAGS: [
        'iframe', 'div', 'img', 'a', 'p', 
        'strong', 'em', 'u', 'b', 'i', 
        'ul', 'ol', 'li', 'br', 'span',
        'h1', 'h2', 'h3', 'h4'
      ],
      ALLOWED_ATTR: [
        'src', 'width', 'height', 'allowfullscreen', 
        'data-youtube-video', 'href', 'alt', 'id',
        'class', 'style', 'target'
      ],
    });
  
    return (
      <article className="py-5 border-b border-gray-200 text-sm discussion_inst">
        <div className="relative">
          {/* Comment count badge */}
          <div className="absolute right-0 top-0 flex items-center gap-2 text-[#e86928]">
            <MessageSquare className="w-5 h-5" />
            <span>
              {commentCount} comment{commentCount !== 1 ? 's' : ''}
            </span>
          </div>
  
          {/* Title */}
          <h6 className="text-lg font-medium text-[#e86928] mb-1 pr-32">{title}</h6>
  
          {/* Author and date */}
          <div className="text-gray-600 mb-4" style={{ fontWeight: 100, fontStyle: "Italic" }}>
            {'Publié par '}
            <span className="text-[#e86928] italic">{author || 'Anonymous'}</span>
            {' le '}
            {formatDateToFrench(date)}
          </div>
  
          {/* Content (sanitized and truncated) */}
          <div
            className="text-gray-700 mb-6 line-clamp-3" // Tailwind's line-clamp for truncation
            dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Safely render HTML
          />
  
          {/* Read more button */}
          <Button onClick={handleReadMoreClick} asChild className="hover:bg-[#d25a1f] bg-primary hover:text-white border rounded-none text-white">
            <Link to={`/communities/${communityPkId}/posts/${pkId}`}>Lire plus</Link>
          </Button>
        </div>
      </article>
    );
  }