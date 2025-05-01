// Weather Types
export interface WeatherData {
  temp: number;
  location: string;
  rain: number;
  wind: number;
  conditions: string;
}

export type WeatherCondition = 'sunny' | 'clouds' | 'rain' | 'thunderstorm' | 'snow' | 'mist';

// Crop Types
export type CropCategory = 'kharif' | 'rabi';

export interface Crop {
  id: string;
  name: string;
  category: CropCategory;
  growthDuration: number; // in days
}

export interface CropGuide {
  title: string;
  steps: CropGuideStep[];
}

export interface CropGuideStep {
  title: string;
  description: string;
  tasks: string[];
}

// Timeline Types
export interface CropTimeline {
  crop: string;
  landPreparationDate: Date;
  sowingDate: Date;
  harvestDate: Date;
  daysTillLandPreparation: number;
  daysTillSowing: number;
  daysTillHarvest: number;
}

// Toast Types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

// Form Types
export interface CropFormData {
  category: CropCategory;
  crop: string;
  startDate: string;
}

// Crop data types
export interface CropData {
  name: string;
  category: 'kharif' | 'rabi';
  growthPeriod: number; // in days
}

// Timeline types
export interface TimelineData {
  startDate: Date;
  landPreparationDate: Date;
  sowingDate: Date;
  harvestDate: Date;
  endDate: Date;
}

// Form data types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
} 