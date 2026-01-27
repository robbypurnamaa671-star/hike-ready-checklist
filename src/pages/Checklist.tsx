import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ReadinessIndicator } from '@/components/readiness/ReadinessIndicator';
import { ChecklistCategoryGroup } from '@/components/checklist/ChecklistCategoryGroup';
import { Button } from '@/components/ui/button';
import { HikePlan, ChecklistItem, ChecklistCategory } from '@/types/hike';
import { 
  getActiveHikeId, 
  getHikePlan, 
  getChecklist, 
  updateChecklistItem,
  saveHikePlan 
} from '@/lib/storage';
import { calculateReadiness, categoryLabels } from '@/lib/checklist-generator';
import { AlertTriangle, Check, RefreshCw } from 'lucide-react';

export default function Checklist() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<HikePlan | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [, setForceUpdate] = useState(0);

  const loadData = useCallback(() => {
    const activeId = getActiveHikeId();
    if (!activeId) {
      navigate('/');
      return;
    }
    
    const hikePlan = getHikePlan(activeId);
    if (!hikePlan) {
      navigate('/');
      return;
    }
    
    const checklist = getChecklist(activeId);
    if (!checklist) {
      navigate('/');
      return;
    }
    
    setPlan(hikePlan);
    setItems(checklist.items);
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleItem = (itemId: string, checked: boolean) => {
    if (!plan) return;
    
    updateChecklistItem(plan.id, itemId, checked);
    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked } : item
      )
    );
    setForceUpdate(n => n + 1);
  };

  const handleMarkReady = () => {
    if (!plan) return;
    
    const updatedPlan = { ...plan, isReady: true };
    saveHikePlan(updatedPlan);
    navigate('/ready');
  };

  const handleResetChecklist = () => {
    if (!plan) return;
    
    items.forEach(item => {
      updateChecklistItem(plan.id, item.id, false);
    });
    
    setItems(prev => prev.map(item => ({ ...item, checked: false })));
  };

  if (!plan) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageContainer>
    );
  }

  const readiness = calculateReadiness(items);
  
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<ChecklistCategory, ChecklistItem[]>);

  const categoryOrder: ChecklistCategory[] = [
    'gear',
    'water-nutrition',
    'clothing',
    'weather-protection',
    'safety-navigation',
    'power-phone',
    'knowledge-planning',
  ];

  return (
    <PageContainer>
      <PageHeader 
        title={plan.name}
        subtitle={`${plan.hikeType} hike • ${plan.duration}h`}
        action={
          <button
            onClick={handleResetChecklist}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Reset checklist"
          >
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
          </button>
        }
      />
      
      {/* Readiness Score */}
      <div className="px-4 py-6">
        <div className="card-elevated p-6 flex flex-col items-center">
          <ReadinessIndicator 
            percentage={readiness.percentage}
            status={readiness.status}
            size="lg"
          />
          
          <p className="mt-4 text-sm text-muted-foreground text-center">
            {readiness.requiredCompleted} of {readiness.requiredTotal} required items complete
          </p>
          
          {/* Missing Critical Warning */}
          {readiness.missingCritical.length > 0 && (
            <div className="mt-4 w-full p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">
                    {readiness.missingCritical.length} critical item{readiness.missingCritical.length > 1 ? 's' : ''} missing
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {readiness.missingCritical.slice(0, 3).map(i => i.name).join(', ')}
                    {readiness.missingCritical.length > 3 && ` +${readiness.missingCritical.length - 3} more`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Checklist Categories */}
      <div className="px-4 space-y-4 pb-4">
        {categoryOrder.map(category => {
          const categoryItems = groupedItems[category];
          if (!categoryItems || categoryItems.length === 0) return null;
          
          return (
            <ChecklistCategoryGroup
              key={category}
              category={category}
              items={categoryItems}
              onToggleItem={handleToggleItem}
            />
          );
        })}
      </div>
      
      {/* Ready Button */}
      <div className="px-4 pb-8">
        <Button
          onClick={handleMarkReady}
          disabled={readiness.status === 'not-ready'}
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          <Check className="mr-2 h-5 w-5" />
          {readiness.status === 'ready' 
            ? "I'm Ready!" 
            : readiness.status === 'caution'
              ? "Mark Ready (with caution)"
              : "Complete required items first"}
        </Button>
        
        {readiness.status === 'not-ready' && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Complete all required items before marking ready
          </p>
        )}
      </div>
    </PageContainer>
  );
}
