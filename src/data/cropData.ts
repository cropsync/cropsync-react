import { Crop, CropCategory, CropGuide } from '../types';

// Crop data
export const crops: Crop[] = [
  // Kharif crops
  { id: 'rice', name: 'Rice', category: 'kharif', growthDuration: 120 },
  { id: 'sweetcorn', name: 'Sweet Corn', category: 'kharif', growthDuration: 80 },
  { id: 'millet', name: 'Millet', category: 'kharif', growthDuration: 95 },
  { id: 'sorghum', name: 'Sorghum', category: 'kharif', growthDuration: 110 },
  { id: 'pearlmillet', name: 'Pearl Millet', category: 'kharif', growthDuration: 90 },
  { id: 'sugarcane', name: 'Sugarcane', category: 'kharif', growthDuration: 300 },
  { id: 'cotton', name: 'Cotton', category: 'kharif', growthDuration: 160 },
  { id: 'groundnut', name: 'Groundnut', category: 'kharif', growthDuration: 110 },
  { id: 'soybeans', name: 'Soybeans', category: 'kharif', growthDuration: 100 },
  { id: 'turmeric', name: 'Turmeric', category: 'kharif', growthDuration: 240 },
  { id: 'maize', name: 'Maize', category: 'kharif', growthDuration: 95 },
  { id: 'sunflower', name: 'Sunflower', category: 'kharif', growthDuration: 100 },
  { id: 'paddy', name: 'Paddy', category: 'kharif', growthDuration: 130 },
  
  // Rabi crops
  { id: 'wheat', name: 'Wheat', category: 'rabi', growthDuration: 150 },
  { id: 'barley', name: 'Barley', category: 'rabi', growthDuration: 120 },
  { id: 'mustard', name: 'Mustard', category: 'rabi', growthDuration: 110 },
  { id: 'chickpeas', name: 'Chickpeas', category: 'rabi', growthDuration: 120 },
  { id: 'lentils', name: 'Lentils', category: 'rabi', growthDuration: 120 },
  { id: 'peas', name: 'Peas', category: 'rabi', growthDuration: 100 },
  { id: 'rapeseed', name: 'Rapeseed', category: 'rabi', growthDuration: 130 },
  { id: 'fennel', name: 'Fennel', category: 'rabi', growthDuration: 150 },
];

// Get crops by category
export const getCropsByCategory = (category: CropCategory): Crop[] => {
  return crops.filter(crop => crop.category === category);
};

// Get crop by ID
export const getCropById = (id: string): Crop | undefined => {
  return crops.find(crop => crop.id === id);
};

// Get crop by name
export const getCropByName = (name: string): Crop | undefined => {
  return crops.find(crop => crop.name === name);
};

// Calculate crop timeline
export const calculateCropTimeline = (cropName: string, startDate: Date) => {
  const crop = getCropByName(cropName);
  if (!crop) return null;

  const landPreparationDate = new Date(startDate);
  landPreparationDate.setDate(landPreparationDate.getDate() + 15);
  
  const sowingDate = new Date(landPreparationDate);
  sowingDate.setDate(sowingDate.getDate() + 15);
  
  const harvestDate = new Date(sowingDate);
  harvestDate.setDate(harvestDate.getDate() + crop.growthDuration);
  
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
  return {
    crop: cropName,
    landPreparationDate,
    sowingDate,
    harvestDate,
    daysTillLandPreparation: Math.max(0, Math.round(Math.abs((landPreparationDate.getTime() - currentDate.getTime()) / oneDay))),
    daysTillSowing: Math.max(0, Math.round(Math.abs((sowingDate.getTime() - currentDate.getTime()) / oneDay))),
    daysTillHarvest: Math.max(0, Math.round(Math.abs((harvestDate.getTime() - currentDate.getTime()) / oneDay)))
  };
};

// Sample crop guides
const wheatGuide: CropGuide = {
  title: 'Rabi - Wheat',
  steps: [
    {
      title: 'Land Preparation',
      description: 'Prepare the land well in advance to ensure optimal growth conditions for Rabi wheat.',
      tasks: [
        'Clear the land of any existing crops, weeds, and debris.',
        'Plow the field to break up the soil and remove any clods.'
      ]
    },
    {
      title: 'Seed selection and sowing',
      description: 'Select high-quality seeds that are specifically bred for Rabi wheat cultivation.',
      tasks: [
        'Choose certified seeds from reliable sources to ensure good germination and disease resistance.',
        'Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.'
      ]
    },
    {
      title: 'Grain Maturation and Harvest',
      description: 'Monitor grain development closely to determine the optimal harvest time.',
      tasks: [
        'The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.',
        'The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.'
      ]
    }
  ]
};

const barleyGuide: CropGuide = {
  title: 'Rabi - Barley',
  steps: [
    {
      title: 'Land Preparation',
      description: 'Prepare the land well in advance to ensure optimal growth conditions for Rabi Barley.',
      tasks: [
        'Clear the land of any existing crops, weeds, and debris.',
        'Plow the field to break up the soil and remove any clods.'
      ]
    },
    {
      title: 'Seed selection and sowing',
      description: 'Select high-quality seeds that are specifically bred for Rabi barley cultivation.',
      tasks: [
        'Choose certified seeds from reliable sources to ensure good germination and disease resistance.',
        'Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.'
      ]
    },
    {
      title: 'Grain Maturation and Harvest',
      description: 'The time duration for barley growth and the specific time of the year to grow barley can vary depending on various factors.',
      tasks: [
        'The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.',
        'The barley crop is ready for harvest when the grains have reached the desired maturity and moisture content.'
      ]
    }
  ]
};

const riceGuide: CropGuide = {
  title: 'Kharif - Rice',
  steps: [
    {
      title: 'Land Preparation',
      description: 'Prepare the land well in advance to ensure optimal growth conditions for Kharif rice.',
      tasks: [
        'Clear the land of any existing crops, weeds, and debris.',
        'Plow the field to break up the soil and remove any clods.'
      ]
    },
    {
      title: 'Seed selection and sowing',
      description: 'Select high-quality seeds that are specifically bred for Kharif rice cultivation.',
      tasks: [
        'Choose certified seeds from reliable sources to ensure good germination and disease resistance.',
        'Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.'
      ]
    },
    {
      title: 'Grain Maturation and Harvest',
      description: 'Rice is typically categorized into two main types: "upland" or "dryland" rice and "paddy" or "wetland" rice.',
      tasks: [
        'The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.',
        'The rice crop is ready for harvest when the grains have reached the desired maturity and moisture content.'
      ]
    }
  ]
};

const cornGuide: CropGuide = {
  title: 'Kharif - Sweet Corn',
  steps: [
    {
      title: 'Land Preparation',
      description: 'Prepare the land well in advance to ensure optimal growth conditions for Kharif Sweet Corn.',
      tasks: [
        'Clear the land of any existing crops, weeds, and debris.',
        'Plow the field to break up the soil and remove any clods.'
      ]
    },
    {
      title: 'Seed selection and sowing',
      description: 'Select high-quality seeds that are specifically bred for Kharif corn cultivation.',
      tasks: [
        'Choose certified seeds from reliable sources to ensure good germination and disease resistance.',
        'Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.'
      ]
    },
    {
      title: 'Grain Maturation and Harvest',
      description: 'Sweet corn is a warm-season crop that thrives in areas with long, sunny days and moderate temperatures.',
      tasks: [
        'The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.',
        'The corn crop is ready for harvest when the kernels are plump and milky.'
      ]
    }
  ]
};

// Map of crop guides
const cropGuides: Record<string, CropGuide> = {
  'wheat': wheatGuide,
  'barley': barleyGuide,
  'rice': riceGuide,
  'sweetcorn': cornGuide,
};

// Get crop guide by ID
export const getCropGuide = (cropId: string): CropGuide | null => {
  return cropGuides[cropId] || null;
};

// Default guide message for crops without detailed guides
export const getDefaultGuide = (): CropGuide => {
  return {
    title: 'Guide Not Available',
    steps: [
      {
        title: 'We\'re still growing our knowledge base',
        description: 'This crop guide will be available soon!',
        tasks: ['Check back later for detailed growing instructions.']
      }
    ]
  };
}; 