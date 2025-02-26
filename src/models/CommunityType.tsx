import { UUID } from "crypto";




export interface Category {
  pkId: UUID;
  nom: string;
  description: string;
}

// Type pour les discussions (si besoin de l'étendre plus tard)
export interface Discussion {
  id: UUID;
  title: string;
  content: string;
  // Ajouter d'autres champs selon les besoins
}

// Type principal pour la Communauté
export interface Communaute {
  pkId: UUID;
  nom: string;
  description: string;
  categories: Category[];
  discussions: Discussion[];
  thumbnail_image: string;
  banner_image: string;
  createdAt?: Date;
  updatedAt?: Date;
  members: number;
  // Ajouter d'autres champs optionnels selon les besoins
}