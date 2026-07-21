export type VehicleType = 'sedan' | 'suv' | 'truck' | 'exotic' | 'rv';

export type ServiceCategory = 'mobile' | 'correction' | 'ceramic' | 'interior';

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  category: ServiceCategory;
  priceStart: number;
  duration: string;
  protectionTerm: string;
  recommendedFor: string;
  popular?: boolean;
  features: string[];
  addonOptions?: { name: string; price: number }[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  vehicle: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  correctionLevel: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'correction' | 'ceramic' | 'interior' | 'full';
  vehicle: string;
  imageUrl: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
  serviceReceived: string;
}

export interface QuoteSelection {
  vehicleType: VehicleType;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  paintColor: string;
  condition: 'excellent' | 'moderate' | 'heavy';
  selectedPackageId: string;
  addons: string[];
  serviceLocation: string;
}

export interface AiConsultationResult {
  recommendation: string;
  recommendedPackage: string;
  estimatedTime: string;
  proTip: string;
}
