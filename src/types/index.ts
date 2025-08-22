export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
}

export interface LostItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: ItemCategory;
  location: Location;
  photos: string[];
  status: ItemStatus;
  reward_amount?: number;
  is_premium: boolean;
  date_lost: string;
  created_at: string;
  user?: User;
}

export interface FoundItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: ItemCategory;
  location: Location;
  photos: string[];
  date_found: string;
  created_at: string;
  user?: User;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  item_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export type ItemCategory = 
  | 'electronics'
  | 'jewelry' 
  | 'documents'
  | 'pets'
  | 'clothing'
  | 'keys'
  | 'bags'
  | 'other';

export type ItemStatus = 'active' | 'found' | 'closed';

export interface SearchFilters {
  category?: ItemCategory;
  city?: string;
  dateFrom?: string;
  dateTo?: string;
  hasReward?: boolean;
  radius?: number;
  location?: Location;
}