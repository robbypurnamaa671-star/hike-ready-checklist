export type HikeType = 'short' | 'day' | 'overnight';
export type TerrainType = 'forest' | 'mountain' | 'coastal' | 'volcanic';
export type ElevationType = 'low' | 'medium' | 'high';
export type GroupSize = 'solo' | 'group';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface HikePlan {
  id: string;
  name: string;
  hikeType: HikeType;
  terrain: TerrainType;
  elevation: ElevationType;
  duration: number; // in hours
  groupSize: GroupSize;
  experienceLevel: ExperienceLevel;
  createdAt: string;
  isReady: boolean;
}

export type ChecklistCategory = 
  | 'gear'
  | 'water-nutrition'
  | 'clothing'
  | 'weather-protection'
  | 'safety-navigation'
  | 'power-phone'
  | 'knowledge-planning';

export type ItemStatus = 'required' | 'recommended';

export interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  category: ChecklistCategory;
  status: ItemStatus;
  isCritical: boolean;
  checked: boolean;
}

export interface HikeChecklist {
  hikeId: string;
  items: ChecklistItem[];
  lastUpdated: string;
}

export type ReadinessStatus = 'ready' | 'caution' | 'not-ready';

export interface ReadinessScore {
  percentage: number;
  status: ReadinessStatus;
  requiredCompleted: number;
  requiredTotal: number;
  missingCritical: ChecklistItem[];
}
