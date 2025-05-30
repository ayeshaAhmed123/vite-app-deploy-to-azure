
export interface Provider {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  email: string;
  website: string;
  services: string[];
  rating: number;
  reviews: number;
  isOpen: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}
