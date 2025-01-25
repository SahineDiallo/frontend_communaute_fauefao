export interface User {
  pkId: string; // UUID
  username: string | null; // Username can be null
  first_name: string; // First name
  last_name: string; // Last name
  full_name: string; // Full name
  email: string; // Email address
  country: string; // Country code (e.g., "SN")
  dateJoined: string; // Date joined (ISO format)
  profile: {
    pkId: string; // Profile UUID
    biographie?: string; // Optional biography
    lieu?: string; // Optional location
    organisation?: string; // Optional organization
    image_url: string; // Profile image URL
    institution?: string; // Optional institution
    poste?: string; // Optional position
    profile_category?: string; // Optional profile category
    x_profile_url?: string; // Optional X (Twitter) profile URL
    linkedin_url?: string; // Optional LinkedIn profile URL
  };
}

export interface Membership {
  user: User; // Nested User object
  communaute: string; // UUID of the community
  role: string; // Role of the user in the community
  date_joined: string; // Date the user joined the community (ISO format)
}

interface Category {
  pkId: string,
  nom: string,
  description: string
}

export interface Community {
  pkId: string;
  nom: string;
  description: string;
  categories: Category[];
  thumbnail_image: string;
  banner_image: string;
}

export interface Discussion {
  pkId: string;
  titre: string;
  contenu: string;
  date_creation: string;
  auteur: {
    first_name: string;
    last_name: string;
  }
  commentCount: 0;
}

export interface File {
  pkId: string;
  fichier: string;
  nom: string;
}

export interface TabData {
  results?: Membership[] | Discussion[] | File[];
}
export interface TabContentProps {
  tab: string;
  data: string | TabData[] | null; // string for 'À Propos', array for other tabs
  loading: boolean;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  } | null;
  onNextPage?: () => void; // Callback for next page
  onPreviousPage?: () => void; // Callback for previous page
}