import { 
  HikePlan, 
  ChecklistItem, 
  ChecklistCategory, 
  ItemStatus,
  ReadinessScore,
  ReadinessStatus,
  WeatherCondition
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
    weather?: WeatherCondition[];
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
  { name: 'Pack rain cover', description: 'Keep your gear dry in wet conditions', category: 'gear', baseStatus: 'required', isCritical: false, conditions: { weather: ['rain', 'mixed'] } },
  
  // WATER & NUTRITION
  { name: 'Water (2L minimum)', description: 'More for hot weather or longer hikes', category: 'water-nutrition', baseStatus: 'required', isCritical: true },
  { name: 'Extra water (3L+)', description: 'Hot conditions require more hydration', category: 'water-nutrition', baseStatus: 'required', isCritical: true, conditions: { weather: ['heat'] } },
  { name: 'Water filter/purification', description: 'Essential if refilling from natural sources', category: 'water-nutrition', baseStatus: 'required', isCritical: true, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Snacks & trail food', description: 'High-energy, easy to eat on the move', category: 'water-nutrition', baseStatus: 'required', isCritical: true },
  { name: 'Full meals', description: 'Packed breakfast, lunch, dinner as needed', category: 'water-nutrition', baseStatus: 'required', isCritical: true, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Hot drinks/thermos', description: 'Warm beverages help maintain core temperature', category: 'water-nutrition', baseStatus: 'recommended', isCritical: false, conditions: { weather: ['cold'] } },
  { name: 'Electrolyte tablets', description: 'Replace salts lost through sweating', category: 'water-nutrition', baseStatus: 'recommended', isCritical: false },
  { name: 'Electrolytes (critical)', description: 'Essential in hot weather to prevent heat illness', category: 'water-nutrition', baseStatus: 'required', isCritical: true, conditions: { weather: ['heat'] } },
  { name: 'Camp stove & fuel', description: 'For cooking hot meals', category: 'water-nutrition', baseStatus: 'required', isCritical: false, conditions: { hikeTypes: ['overnight'] } },
  
  // CLOTHING
  { name: 'Moisture-wicking base layer', description: 'Keeps you dry and comfortable', category: 'clothing', baseStatus: 'required', isCritical: false },
  { name: 'Insulating mid layer', description: 'Fleece or down for warmth', category: 'clothing', baseStatus: 'required', isCritical: true, conditions: { elevations: ['medium', 'high'] } },
  { name: 'Warm insulating layers', description: 'Multiple layers for cold conditions', category: 'clothing', baseStatus: 'required', isCritical: true, conditions: { weather: ['cold'] } },
  { name: 'Extra socks', description: 'Dry feet prevent blisters', category: 'clothing', baseStatus: 'required', isCritical: false },
  { name: 'Waterproof socks or extras', description: 'Keep feet dry in wet conditions', category: 'clothing', baseStatus: 'required', isCritical: false, conditions: { weather: ['rain', 'mixed'] } },
  { name: 'Hat/cap', description: 'Sun protection or warmth depending on conditions', category: 'clothing', baseStatus: 'required', isCritical: false },
  { name: 'Wide-brim sun hat', description: 'Maximum sun protection for hot conditions', category: 'clothing', baseStatus: 'required', isCritical: true, conditions: { weather: ['heat'] } },
  { name: 'Warm beanie/hat', description: 'Prevent heat loss from head', category: 'clothing', baseStatus: 'required', isCritical: true, conditions: { weather: ['cold'] } },
  { name: 'Gloves', description: 'Protect hands in cold or rough terrain', category: 'clothing', baseStatus: 'recommended', isCritical: false, conditions: { elevations: ['high'], terrains: ['mountain'] } },
  { name: 'Warm gloves', description: 'Insulated gloves for cold conditions', category: 'clothing', baseStatus: 'required', isCritical: true, conditions: { weather: ['cold'] } },
  { name: 'Gaiters', description: 'Keep debris out of boots', category: 'clothing', baseStatus: 'recommended', isCritical: false, conditions: { terrains: ['volcanic', 'mountain'] } },
  { name: 'Lightweight breathable clothing', description: 'Light colors, loose fit for heat', category: 'clothing', baseStatus: 'required', isCritical: false, conditions: { weather: ['heat'] } },
  { name: 'Neck gaiter/buff', description: 'Versatile protection from sun, cold, or wind', category: 'clothing', baseStatus: 'recommended', isCritical: false, conditions: { weather: ['cold', 'heat'] } },
  
  // WEATHER PROTECTION
  { name: 'Rain jacket', description: 'Waterproof and breathable', category: 'weather-protection', baseStatus: 'required', isCritical: true },
  { name: 'Rain pants', description: 'Full weather protection', category: 'weather-protection', baseStatus: 'recommended', isCritical: false, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Full rain gear', description: 'Jacket + pants for expected rain', category: 'weather-protection', baseStatus: 'required', isCritical: true, conditions: { weather: ['rain'] } },
  { name: 'Waterproof bag liners', description: 'Keep essentials dry inside pack', category: 'weather-protection', baseStatus: 'required', isCritical: false, conditions: { weather: ['rain', 'mixed'] } },
  { name: 'Sunscreen SPF 30+', description: 'Apply before and during hike', category: 'weather-protection', baseStatus: 'required', isCritical: false },
  { name: 'Sunscreen SPF 50+', description: 'High protection essential in intense sun', category: 'weather-protection', baseStatus: 'required', isCritical: true, conditions: { weather: ['heat'] } },
  { name: 'Sunglasses', description: 'UV protection, especially at altitude', category: 'weather-protection', baseStatus: 'required', isCritical: false },
  { name: 'Emergency space blanket', description: 'Compact warmth if stranded', category: 'weather-protection', baseStatus: 'required', isCritical: true },
  { name: 'Umbrella (trekking)', description: 'Shade from sun or light rain', category: 'weather-protection', baseStatus: 'recommended', isCritical: false, conditions: { weather: ['heat', 'rain'] } },
  { name: 'Hand/toe warmers', description: 'Chemical warmers for emergency warmth', category: 'weather-protection', baseStatus: 'recommended', isCritical: false, conditions: { weather: ['cold'] } },
  
  // SAFETY & NAVIGATION
  { name: 'First aid kit', description: 'Bandages, antiseptic, medications, blister care', category: 'safety-navigation', baseStatus: 'required', isCritical: true },
  { name: 'Heat illness supplies', description: 'Cold packs, extra water, shade materials', category: 'safety-navigation', baseStatus: 'required', isCritical: true, conditions: { weather: ['heat'] } },
  { name: 'Physical map of area', description: 'Works without battery or signal', category: 'safety-navigation', baseStatus: 'required', isCritical: true },
  { name: 'Waterproof map case', description: 'Keep map readable in rain', category: 'safety-navigation', baseStatus: 'required', isCritical: false, conditions: { weather: ['rain', 'mixed'] } },
  { name: 'Compass', description: 'Know how to use it with your map', category: 'safety-navigation', baseStatus: 'required', isCritical: true, conditions: { experienceLevel: ['beginner', 'intermediate'] } },
  { name: 'Whistle', description: 'Three blasts = emergency signal', category: 'safety-navigation', baseStatus: 'required', isCritical: true },
  { name: 'Multi-tool/knife', description: 'Repairs, first aid, food prep', category: 'safety-navigation', baseStatus: 'required', isCritical: false },
  { name: 'Fire starter', description: 'Matches/lighter in waterproof container', category: 'safety-navigation', baseStatus: 'recommended', isCritical: false, conditions: { hikeTypes: ['day', 'overnight'] } },
  { name: 'Waterproof fire starter', description: 'Essential backup warmth in wet/cold', category: 'safety-navigation', baseStatus: 'required', isCritical: true, conditions: { weather: ['rain', 'cold', 'mixed'] } },
  { name: 'Bear spray', description: 'Know how to use before needed', category: 'safety-navigation', baseStatus: 'recommended', isCritical: false, conditions: { terrains: ['forest', 'mountain'] } },
  
  // POWER & PHONE
  { name: 'Fully charged phone', description: 'Emergency contact capability', category: 'power-phone', baseStatus: 'required', isCritical: true },
  { name: 'Portable power bank', description: 'Keep devices charged', category: 'power-phone', baseStatus: 'required', isCritical: false, conditions: { minDuration: 4 } },
  { name: 'Offline maps downloaded', description: 'GPS works without cell signal', category: 'power-phone', baseStatus: 'recommended', isCritical: false },
  { name: 'Emergency contacts saved', description: 'ICE contacts accessible', category: 'power-phone', baseStatus: 'required', isCritical: true },
  { name: 'Waterproof phone case', description: 'Protect electronics from rain', category: 'power-phone', baseStatus: 'required', isCritical: false, conditions: { weather: ['rain', 'mixed'] } },
  
  // KNOWLEDGE & PLANNING
  { name: 'Route researched', description: 'Know distance, elevation, difficulty', category: 'knowledge-planning', baseStatus: 'required', isCritical: true },
  { name: 'Weather forecast checked', description: 'Check day before and morning of', category: 'knowledge-planning', baseStatus: 'required', isCritical: true },
  { name: 'Heat safety plan', description: 'Know cooling spots, turnaround time, symptoms', category: 'knowledge-planning', baseStatus: 'required', isCritical: true, conditions: { weather: ['heat'] } },
  { name: 'Cold weather safety plan', description: 'Know warming strategies, hypothermia signs', category: 'knowledge-planning', baseStatus: 'required', isCritical: true, conditions: { weather: ['cold'] } },
  { name: 'Wet weather contingency', description: 'Plan B routes, shelter locations', category: 'knowledge-planning', baseStatus: 'required', isCritical: false, conditions: { weather: ['rain', 'mixed'] } },
  { name: 'Someone knows your plan', description: 'Leave itinerary with trusted contact', category: 'knowledge-planning', baseStatus: 'required', isCritical: true },
  { name: 'Trailhead parking confirmed', description: 'Know where to park and fees', category: 'knowledge-planning', baseStatus: 'recommended', isCritical: false },
  { name: 'Permits obtained', description: 'Check if required for your trail', category: 'knowledge-planning', baseStatus: 'recommended', isCritical: false },
  { name: 'Group meeting point set', description: 'Clear time and location', category: 'knowledge-planning', baseStatus: 'required', isCritical: false, conditions: { groupSize: 'group' } },
  { name: 'Emergency procedures reviewed', description: 'Know what to do if separated or injured', category: 'knowledge-planning', baseStatus: 'required', isCritical: true, conditions: { experienceLevel: ['beginner'] } },
];

function shouldIncludeItem(item: ItemTemplate, plan: HikePlan): boolean {
  if (!item.conditions) return true;
  
  const { hikeTypes, terrains, elevations, minDuration, groupSize, experienceLevel, weather } = item.conditions;
  
  if (hikeTypes && !hikeTypes.includes(plan.hikeType)) return false;
  if (terrains && !terrains.includes(plan.terrain)) return false;
  if (elevations && !elevations.includes(plan.elevation)) return false;
  if (minDuration && plan.duration < minDuration) return false;
  if (groupSize && groupSize !== plan.groupSize) return false;
  if (experienceLevel && !experienceLevel.includes(plan.experienceLevel)) return false;
  
  // Weather condition check - include if plan weather matches any in conditions
  // Also include weather items for 'mixed' weather
  if (weather) {
    const planWeather = plan.weather || 'clear';
    if (planWeather === 'mixed') {
      // Mixed weather includes rain, cold, and heat items
      return true;
    }
    if (!weather.includes(planWeather)) return false;
  }
  
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
    // Electrolytes required in heat
    if (item.name === 'Electrolyte tablets' && plan.weather === 'heat') {
      return 'required';
    }
    // Hot drinks required in cold
    if (item.name === 'Hot drinks/thermos' && plan.weather === 'cold') {
      return 'required';
    }
  }
  return item.baseStatus;
}

function adjustItemCriticality(item: ItemTemplate, plan: HikePlan): boolean {
  // Some items become critical based on weather
  if (plan.weather === 'rain' || plan.weather === 'mixed') {
    if (item.name === 'Rain jacket' || item.name === 'Full rain gear') return true;
  }
  if (plan.weather === 'cold') {
    if (item.name === 'Emergency space blanket') return true;
  }
  return item.isCritical;
}

export function generateChecklist(plan: HikePlan): ChecklistItem[] {
  let idCounter = 0;
  
  // Ensure backwards compatibility - default to 'clear' if weather not set
  const planWithDefaults = {
    ...plan,
    weather: plan.weather || 'clear'
  };
  
  return itemTemplates
    .filter(item => shouldIncludeItem(item, planWithDefaults))
    .map(item => ({
      id: `item-${++idCounter}`,
      name: item.name,
      description: item.description,
      category: item.category,
      status: adjustItemStatus(item, planWithDefaults),
      isCritical: adjustItemCriticality(item, planWithDefaults),
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
