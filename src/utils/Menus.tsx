import { Home, Building2, Users2, Network, LucideIcon, Users, MessageCircle, BookOpen } from 'lucide-react';

export interface MenuItem {
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  subMenus?: MenuItem[];
}

export const Menu: MenuItem[] = [
  {
    name: "Accueil",
    description: "Page d'accueil du site",
    icon: Home,
    path: "/"
  },
  {
    name: "Institutions",
    description: "Découvrez nos institutions partenaires",
    icon: Building2,
    path: "/institutions"
  },
  {
    name: "Membres",
    description: "Explorez nos membres",
    icon: Users2,
    path: "/membres"
  },
  {
    name: "Communautés",
    description: "Découvrez nos communautés",
    icon: Network,
    path: "/communautes"
  }
];

export const DetailPageMenuItems: MenuItem[] = [
  {
    name: "À Propos",
    description: "Page d'accueil du site",
    icon: Home,
    path: "/",
  },
  {
    name: "Membres",
    description: "Liste des membres",
    icon: Users,
    path: "/membres",
  },
  {
    name: "Discussions",
    description: "Forum de discussions",
    icon: MessageCircle,
    path: "/discussions",
  },
  {
    name: "Ressources",
    description: "Accès aux ressources",
    icon: BookOpen,
    path: "/ressources",
  },
];