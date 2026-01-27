import { HikePlan, HikeChecklist, ChecklistItem } from '@/types/hike';

const STORAGE_KEYS = {
  HIKE_PLANS: 'hikeready_plans',
  CHECKLISTS: 'hikeready_checklists',
  ACTIVE_HIKE: 'hikeready_active_hike',
};

// Hike Plans
export function getHikePlans(): HikePlan[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HIKE_PLANS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHikePlan(plan: HikePlan): void {
  const plans = getHikePlans();
  const existingIndex = plans.findIndex(p => p.id === plan.id);
  
  if (existingIndex >= 0) {
    plans[existingIndex] = plan;
  } else {
    plans.unshift(plan);
  }
  
  localStorage.setItem(STORAGE_KEYS.HIKE_PLANS, JSON.stringify(plans));
}

export function deleteHikePlan(id: string): void {
  const plans = getHikePlans().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.HIKE_PLANS, JSON.stringify(plans));
  
  // Also delete associated checklist
  deleteChecklist(id);
  
  // Clear active if this was it
  if (getActiveHikeId() === id) {
    clearActiveHike();
  }
}

export function getHikePlan(id: string): HikePlan | null {
  const plans = getHikePlans();
  return plans.find(p => p.id === id) || null;
}

// Checklists
export function getChecklist(hikeId: string): HikeChecklist | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    const checklists: HikeChecklist[] = data ? JSON.parse(data) : [];
    return checklists.find(c => c.hikeId === hikeId) || null;
  } catch {
    return null;
  }
}

export function saveChecklist(checklist: HikeChecklist): void {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    const checklists: HikeChecklist[] = data ? JSON.parse(data) : [];
    const existingIndex = checklists.findIndex(c => c.hikeId === checklist.hikeId);
    
    if (existingIndex >= 0) {
      checklists[existingIndex] = checklist;
    } else {
      checklists.push(checklist);
    }
    
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
  } catch (error) {
    console.error('Failed to save checklist:', error);
  }
}

export function deleteChecklist(hikeId: string): void {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    const checklists: HikeChecklist[] = data ? JSON.parse(data) : [];
    const filtered = checklists.filter(c => c.hikeId !== hikeId);
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete checklist:', error);
  }
}

export function updateChecklistItem(hikeId: string, itemId: string, checked: boolean): void {
  const checklist = getChecklist(hikeId);
  if (!checklist) return;
  
  const updatedItems = checklist.items.map(item => 
    item.id === itemId ? { ...item, checked } : item
  );
  
  saveChecklist({
    ...checklist,
    items: updatedItems,
    lastUpdated: new Date().toISOString(),
  });
}

// Active Hike
export function getActiveHikeId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_HIKE);
}

export function setActiveHike(id: string): void {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_HIKE, id);
}

export function clearActiveHike(): void {
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_HIKE);
}

// Utility
export function generateId(): string {
  return `hike-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
