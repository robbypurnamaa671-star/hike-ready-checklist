import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { HikePlan, ChecklistItem } from '@/types/hike';
import { getActiveHikeId, getHikePlan, getChecklist, clearActiveHike } from '@/lib/storage';
import { calculateReadiness, categoryLabels, categoryIcons } from '@/lib/checklist-generator';
import { CheckCircle2, ArrowLeft, Share2, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReadyPage() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<HikePlan | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    const activeId = getActiveHikeId();
    if (!activeId) {
      navigate('/');
      return;
    }
    
    const hikePlan = getHikePlan(activeId);
    const checklist = getChecklist(activeId);
    
    if (!hikePlan || !checklist) {
      navigate('/');
      return;
    }
    
    setPlan(hikePlan);
    setItems(checklist.items);
  }, [navigate]);

  const handleNewHike = () => {
    clearActiveHike();
    navigate('/plan/new');
  };

  const handleBackToChecklist = () => {
    navigate('/checklist');
  };

  if (!plan) {
    return (
      <PageContainer hideNav>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageContainer>
    );
  }

  const readiness = calculateReadiness(items);
  const checkedItems = items.filter(i => i.checked);

  // Group checked items by category for summary
  const groupedChecked = checkedItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <PageContainer hideNav>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground px-6 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-foreground/20 mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-2">
            You're Ready!
          </h1>
          
          <p className="text-primary-foreground/80 text-lg">
            {plan.name}
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-primary-foreground/70">
            <span>{plan.hikeType} hike</span>
            <span>•</span>
            <span>{plan.duration}h</span>
            <span>•</span>
            <span className="capitalize">{plan.terrain}</span>
          </div>
          
          <div className="mt-6 text-4xl font-bold">
            {readiness.percentage}%
          </div>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Readiness Score
          </p>
        </div>
        
        {/* Checklist Summary */}
        <div className="flex-1 px-4 py-6 bg-background">
          <h2 className="section-title mb-4 px-2">Your Packed Items</h2>
          
          <div className="space-y-4">
            {Object.entries(groupedChecked).map(([category, categoryItems]) => (
              <div key={category} className="card-elevated p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </span>
                  <h3 className="font-semibold">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {categoryItems.length} items
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categoryItems.map(item => (
                    <span 
                      key={item.id}
                      className="px-3 py-1.5 rounded-full text-sm bg-success/10 text-success font-medium"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Safety Reminder */}
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-3">
              <Mountain className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Stay Safe Out There</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Always tell someone your plans, check weather before leaving, and turn back if conditions change.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="px-4 py-6 space-y-3 safe-bottom bg-background border-t border-border">
          <Button
            onClick={handleBackToChecklist}
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Checklist
          </Button>
          
          <Button
            onClick={handleNewHike}
            className="w-full h-12 rounded-xl"
          >
            Plan New Hike
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
