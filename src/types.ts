export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
  popular?: boolean;
  sort_order?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'asansor' | 'ambalaj' | 'araclar' | 'tasima';
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
  status?: 'approved' | 'pending';
}

export interface QuoteFormData {
  id?: string;
  name: string;
  phone: string;
  fromLocation: string;
  toLocation: string;
  moveType: string;
  moveDate: string;
  note: string;
  createdAt: string;
}

export interface CompanySettings {
  phonePrimary: string;
  phonePrimaryRaw: string;
  whatsappNumber: string;
  address: string;
  email: string;
}

export interface PricingConfig {
  base_prices: { [key: string]: number };
  floor_cost_per_floor: number;
  route_costs: { [key: string]: number };
  elevator_cost: number;
  markup_percent: number;
}
