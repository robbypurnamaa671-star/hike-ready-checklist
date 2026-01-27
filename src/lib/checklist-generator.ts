import { 
  HikePlan, 
  ChecklistItem, 
  ChecklistCategory, 
  ItemStatus,
  ReadinessScore,
  ReadinessStatus 
} from '@/types/hike';

interface ItemTemplate {
  name: string;
  description: string;
  category: ChecklistCategory;
  baseStatus: ItemStatus;
  isCritical: boolean;
  conditions?: {
    hikeTypes?: HikePlan['hikeType'][];
    terrains?: HikePlan['terrain'][];
    elevations?: HikePlan['elevation'][];
    minDuration?: number;
    groupSize?: HikePlan['groupSize'];
    experienceLevel?: HikePlan['experienceLevel'][];
  };
}

const itemTemplates: ItemTemplate[] = [
  // GEAR
  { name: 'Backpack', description: 'Appropriate size for your hike duration', category: 'gear', baseStatus: 'required', isCritical: true },
  { name: 'Hiking boots/shoes', description: 'Broken-in, ankle support for rough terrain', category: 'gear', baseStatus: 'required', isCritical: true },
  { name: 'Trekking poles', description: 'Reduce strain on knees, especially on descents', category: 'gear', baseStatus: 'recommended', isCritical: false, conditions: { elevations: ['medium', 'high'] } },
  { name: 'Headlamp + batteries', description: 'Essential if caught after dark', category: 'gear', baseStatus: 'required', isCritical: true, conditions: { minDuration: 4 } },
  { name: 'Tent', description: 'Appropriate weight and weather rating', category: 'gear', baseStatus: 'required', isCritical: true, conditions: { hikeTypes: ['overnight'] } },
  { name: 'Sleeping bag', description: 'Temperature rated for expected conditions', category: 'gear', baseStatus: 'required', isCritical: true, conditions: { hikeTypes: ['overnight'] } },
  { name: 'Sleeping pad', description: 'Insulation and comfort from ground', category: 'gear', baseStatus: 'required', isCritical: false, conditions: { hikeTypes: ['overnight'] } },
  
  // WATER & NUTRITION
  { name: 'Water (2L minimum)', description: 'More for hot weather or longer hikes', category: 'water-nutrition', baseStatus: 'required', isCritical: true },
  { name: 'Water filter/purification', description: 'Essential if refilling from natural sources', category: 'water-nutrition', baseStatus: 'required', isCritical: true, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Snacks & trail food', description: 'High-energy, easy to eat on the move', category: 'water-nutrition', baseStatus: 'required', isCritical: true },
  { name: 'Full meals', description: 'Packed breakfast, lunch, dinner as needed', category: 'water-nutrition', baseStatus: 'required', isCritical: true, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Electrolyte tablets', description: 'Replace salts lost through sweating', category: 'water-nutrition', baseStatus: 'recommended', isCritical: false },
  { name: 'Camp stove & fuel', description: 'For cooking hot meals', category: 'water-nutrition', baseStatus: 'required', isCritical: false, conditions: { hikeTypes: ['overnight'] } },
  
  // CLOTHING
  { name: 'Moisture-wicking base layer', description: 'Keeps you dry and comfortable', category: 'clothing', baseStatus: 'required', isCritical: false },
  { name: 'Insulating mid layer', description: 'Fleece or down for warmth', category: 'clothing', baseStatus: 'required', isCritical: true, conditions: { elevations: ['medium', 'high'] } },
  { name: 'Extra socks', description: 'Dry feet prevent blisters', category: 'clothing', baseStatus: 'required', isCritical: false },
  { name: 'Hat/cap', description: 'Sun protection or warmth depending on conditions', category: 'clothing', baseStatus: 'required', isCritical: false },
  { name: 'Gloves', description: 'Protect hands in cold or rough terrain', category: 'clothing', baseStatus: 'recommended', isCritical: false, conditions: { elevations: ['high'], terrains: ['mountain'] } },
  { name: 'Gaiters', description: 'Keep debris out of boots', category: 'clothing', baseStatus: 'recommended', isCritical: false, conditions: { terrains: ['volcanic', 'mountain'] } },
  
  // WEATHER PROTECTION
  { name: 'Rain jacket', description: 'Waterproof and breathable', category: 'weather-protection', baseStatus: 'required', isCritical: true },
  { name: 'Rain pants', description: 'Full weather protection', category: 'weather-protection', baseStatus: 'recommended', isCritical: false, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Sunscreen SPF 30+', description: 'Apply before and during hike', category: 'weather-protection', baseStatus: 'required', isCritical: false },
  { name: 'Sunglasses', description: 'UV protection, especially at altitude', category: 'weather-protection', baseStatus: 'required', isCritical: false },
  { name: 'Emergency space blanket', description: 'Compact warmth if stranded', category: 'weather-protection', baseStatus: 'required', isCritical: true },
  
  // SAFETY & NAVIGATION
  { name: 'First aid kit', description: 'Bandages, antiseptic, medications, blister care', category: 'safety-navigation', baseStatus: 'required', isCritical: true },
  { name: 'Physical map of area', description: 'Works without battery or signal', category: 'safety-navigation', baseStatus: 'required', isCritical: true },
  { name: 'Compass', description: 'Know how to use it with your map', category: 'safety-navigation', baseStatus: 'required', isCritical: true, conditions: { experienceLevel: ['beginner', 'intermediate'] } },
  { name: 'Whistle', description: 'Three blasts = emergency signal', category: 'safety-navigation', baseStatus: 'required', isCritical: true },
  { name: 'Multi-tool/knife', description: 'Repairs, first aid, food prep', category: 'safety-navigation', baseStatus: 'required', isCritical: false },
  { name: 'Fire starter', description: 'Matches/lighter in waterproof container', category: 'safety-navigation', baseStatus: 'recommended', isCritical: false, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Bear spray', description: 'Know how to use before needed', category: 'safety-navigation', baseStatus: 'recommended', isCritical: false, conditions: { terrains: ['forest', 'mountain'] } },
  
  // POWER & PHONE
  { name: 'Fully charged phone', description: 'Emergency contact capability', category: 'power-phone', baseStatus: 'required', isCritical: true },
  { name: 'Portable power bank', description: 'Keep devices charged', category: 'power-phone', baseStatus: 'required', isCritical: false, conditions: { minDuration: 4 } },
  { name: 'Offline maps downloaded', description: 'GPS works without cell signal', category: 'power-phone', baseStatus: 'recommended', isCritical: false },
  { name: 'Emergency contacts saved', description: 'ICE contacts accessible', category: 'power-phone', baseStatus: 'required', isCritical: true },
  
  // KNOWLEDGE & PLANNING
  { name: 'Route researched', description: 'Know distance, elevation, difficulty', category: 'knowledge-planning', baseStatus: 'required', isCritical: true },
  { name: 'Weather forecast checked', description: 'Check day before and morning of', category: 'knowledge-planning', baseStatus: 'required', isCritical: true },
  { name: 'Someone knows your plan', description: 'Leave itinerary with trusted contact', category: 'knowledge-planning', baseStatus: 'required', isCritical: true },
  { name: 'Trailhead parking confirmed', description: 'Know where to park and fees', category: 'knowledge-planning', baseStatus: 'recommended', isCritical: false },
  { name: 'Permits obtained', description: 'Check if required for your trail', category: 'knowledge-planning', baseStatus: 'recommended', isCritical: false },
  { name: 'Group meeting point set', description: 'Clear time and location', category: 'knowledge-planning', baseStatus: 'required', isCritical: false, conditions: { groupSize: 'group' } },
  { name: 'Emergency procedures reviewed', description: 'Know what to do if separated or injured', category: 'knowledge-planning', baseStatus: 'required', isCritical: true, conditions: { experienceLevel: ['beginner'] } },
];

function shouldIncludeItem(item: ItemTemplate, plan: HikePlan): boolean {
  if (!item.conditions) return true;
  
  const { hikeTypes, terrains, elevations, minDuration, groupSize, experienceLevel } = item.conditions;
  
  if (hikeTypes && !hikeTypes.includes(plan.hikeType)) return false;
  if (terrains && !terrains.includes(plan.terrain)) return false;
  if (elevations && !elevations.includes(plan.elevation)) return false;
  if (minDuration && plan.duration < minDuration) return false;
  if (groupSize && groupSize !== plan.groupSize) return false;
  if (experienceLevel && !experienceLevel.includes(plan.experienceLevel)) return false;
  
  return true;
}

function adjustItemStatus(item: ItemTemplate, plan: HikePlan): ItemStatus {
  // Upgrade recommendations to required for certain conditions
  if (item.baseStatus === 'recommended') {
    // Trekking poles become required for high elevation
    if (item.name === 'Trekking poles' && plan.elevation === 'high') {
      return 'required';
    }
    // Rain pants required for overnight
    if (item.name === 'Rain pants' && plan.hikeType === 'overnight') {
      return 'required';
    }
  }
  return item.baseStatus;
}

export function generateChecklist(plan: HikePlan): ChecklistItem[] {
  let idCounter = 0;
  
  return itemTemplates
    .filter(item => shouldIncludeItem(item, plan))
    .map(item => ({
      id: `item-${++idCounter}`,
      name: item.name,
      description: item.description,
      category: item.category,
      status: adjustItemStatus(item, plan),
      isCritical: item.isCritical,
      checked: false,
    }));
}

export function calculateReadiness(items: ChecklistItem[]): ReadinessScore {
  const requiredItems = items.filter(item => item.status === 'required');
  const completedRequired = requiredItems.filter(item => item.checked);
  const missingCritical = items.filter(item => item.isCritical && !item.checked);
  
  const percentage = requiredItems.length > 0 
    ? Math.round((completedRequired.length / requiredItems.length) * 100)
    : 0;
  
  let status: ReadinessStatus;
  if (percentage === 100 && missingCritical.length === 0) {
    status = 'ready';
  } else if (percentage >= 70 && missingCritical.length === 0) {
    status = 'caution';
  } else {
    status = 'not-ready';
  }
  
  return {
    percentage,
    status,
    requiredCompleted: completedRequired.length,
    requiredTotal: requiredItems.length,
    missingCritical,
  };
}

export const categoryLabels: Record<ChecklistCategory, string> = {
  'gear': 'Gear',
  'water-nutrition': 'Water & Nutrition',
  'clothing': 'Clothing',
  'weather-protection': 'Weather Protection',
  'safety-navigation': 'Safety & Navigation',
  'power-phone': 'Power & Phone',
  'knowledge-planning': 'Knowledge & Planning',
};

export const categoryIcons: Record<ChecklistCategory, string> = {
  'gear': '🎒',
  'water-nutrition': '💧',
  'clothing': '👕',
  'weather-protection': '🌧️',
  'safety-navigation': '🧭',
  'power-phone': '🔋',
  'knowledge-planning': '📋',
};
