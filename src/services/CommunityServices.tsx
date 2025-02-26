
import { Communaute } from "../models/CommunityType";
import { Category } from "../types";
import API_BASE_URL  from '../constantes/api';

// const API_URL = 'http://localhost:8000/api/communautes/'; // URL de votre backend


/**
 * Récupère la liste des communautés depuis l'API.
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/`);
    if (!response.ok) {
      throw new Error('Failed to fetch communities');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching communities:', error);
    return [];
  }
};

/**
 * Récupère la liste des communautés depuis l'API.
 */
export const fetchCommunities = async (): Promise<Communaute[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/communautes/`);
    if (!response.ok) {
      throw new Error('Failed to fetch communities');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching communities:', error);
    return [];
  }
};

/**
 * Ajoute une nouvelle communauté à l'API.
 * @param newCommunity - Les données de la nouvelle communauté à ajouter.
 */
export const addCommunity = async (formData: FormData): Promise<Communaute> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/addComminities  `, {
      method: 'POST',
      body: formData, // Pas besoin de headers pour FormData
    });

    if (!response.ok) {
      throw new Error('Failed to add community');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding community:', error);
    throw error;
  }
};





