import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  HikePlan, 
  HikeType, 
  TerrainType, 
  ElevationType, 
  GroupSize, 
  ExperienceLevel 
} from '@/types/hike';
import { saveHikePlan, setActiveHike, generateId, saveChecklist } from '@/lib/storage';
import { generateChecklist } from '@/lib/checklist-generator';
import { cn } from '@/lib/utils';
import { 
  TreePine, 
  Mountain, 
  Waves, 
  Flame,
  User,
  Users,
  ChevronRight
} from 'lucide-react';

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function OptionButton({ selected, onClick, children, icon }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all touch-target',
        'border-2',
        selected 
          ? 'border-primary bg-primary/10 text-primary' 
          : 'border-border bg-card text-foreground hover:border-primary/50'
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export default function NewHikePlan() {
  const navigate = useNavigate();
  
  const [hikeName, setHikeName] = useState('');
  const [hikeType, setHikeType] = useState<HikeType>('day');
  const [terrain, setTerrain] = useState<TerrainType>('forest');
  const [elevation, setElevation] = useState<ElevationType>('medium');
  const [duration, setDuration] = useState(4);
  const [groupSize, setGroupSize] = useState<GroupSize>('solo');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('intermediate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const id = generateId();
    const plan: HikePlan = {
      id,
      name: hikeName || `${terrain.charAt(0).toUpperCase() + terrain.slice(1)} ${hikeType} hike`,
      hikeType,
      terrain,
      elevation,
      duration,
      groupSize,
      experienceLevel,
      createdAt: new Date().toISOString(),
      isReady: false,
    };
    
    saveHikePlan(plan);
    setActiveHike(id);
    
    // Generate and save checklist
    const items = generateChecklist(plan);
    saveChecklist({
      hikeId: id,
      items,
      lastUpdated: new Date().toISOString(),
    });
    
    navigate('/checklist');
  };

  const terrainOptions: { value: TerrainType; label: string; icon: React.ReactNode }[] = [
    { value: 'forest', label: 'Forest', icon: <TreePine className="h-5 w-5" /> },
    { value: 'mountain', label: 'Mountain', icon: <Mountain className="h-5 w-5" /> },
    { value: 'coastal', label: 'Coastal', icon: <Waves className="h-5 w-5" /> },
    { value: 'volcanic', label: 'Volcanic', icon: <Flame className="h-5 w-5" /> },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Plan Your Hike" 
        subtitle="Tell us about your adventure"
        showBack 
      />
      
      <form onSubmit={handleSubmit} className="px-4 space-y-6 pb-8">
        {/* Hike Name */}
        <div className="space-y-2">
          <Label htmlFor="hikeName" className="section-title">Hike Name (optional)</Label>
          <input
            id="hikeName"
            type="text"
            value={hikeName}
            onChange={(e) => setHikeName(e.target.value)}
            placeholder="e.g., Mt. Wilson Summit"
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Hike Type */}
        <div className="space-y-3">
          <Label className="section-title">Hike Type</Label>
          <div className="grid grid-cols-3 gap-2">
            <OptionButton 
              selected={hikeType === 'short'} 
              onClick={() => setHikeType('short')}
            >
              Short
            </OptionButton>
            <OptionButton 
              selected={hikeType === 'day'} 
              onClick={() => setHikeType('day')}
            >
              Day
            </OptionButton>
            <OptionButton 
              selected={hikeType === 'overnight'} 
              onClick={() => setHikeType('overnight')}
            >
              Overnight
            </OptionButton>
          </div>
        </div>

        {/* Terrain */}
        <div className="space-y-3">
          <Label className="section-title">Terrain</Label>
          <div className="grid grid-cols-2 gap-2">
            {terrainOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={terrain === opt.value}
                onClick={() => setTerrain(opt.value)}
                icon={opt.icon}
              >
                {opt.label}
              </OptionButton>
            ))}
          </div>
        </div>

        {/* Elevation */}
        <div className="space-y-3">
          <Label className="section-title">Elevation Gain</Label>
          <div className="grid grid-cols-3 gap-2">
            <OptionButton 
              selected={elevation === 'low'} 
              onClick={() => setElevation('low')}
            >
              Low
            </OptionButton>
            <OptionButton 
              selected={elevation === 'medium'} 
              onClick={() => setElevation('medium')}
            >
              Medium
            </OptionButton>
            <OptionButton 
              selected={elevation === 'high'} 
              onClick={() => setElevation('high')}
            >
              High
            </OptionButton>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label className="section-title">Duration: {duration} hours</Label>
          <input
            type="range"
            min="1"
            max="24"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1h</span>
            <span>12h</span>
            <span>24h</span>
          </div>
        </div>

        {/* Group Size */}
        <div className="space-y-3">
          <Label className="section-title">Group Size</Label>
          <div className="grid grid-cols-2 gap-2">
            <OptionButton 
              selected={groupSize === 'solo'} 
              onClick={() => setGroupSize('solo')}
              icon={<User className="h-5 w-5" />}
            >
              Solo
            </OptionButton>
            <OptionButton 
              selected={groupSize === 'group'} 
              onClick={() => setGroupSize('group')}
              icon={<Users className="h-5 w-5" />}
            >
              Group
            </OptionButton>
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="section-title">Experience Level</Label>
          <div className="grid grid-cols-3 gap-2">
            <OptionButton 
              selected={experienceLevel === 'beginner'} 
              onClick={() => setExperienceLevel('beginner')}
            >
              Beginner
            </OptionButton>
            <OptionButton 
              selected={experienceLevel === 'intermediate'} 
              onClick={() => setExperienceLevel('intermediate')}
            >
              Intermediate
            </OptionButton>
            <OptionButton 
              selected={experienceLevel === 'advanced'} 
              onClick={() => setExperienceLevel('advanced')}
            >
              Advanced
            </OptionButton>
          </div>
        </div>

        {/* Submit */}
        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          Generate Checklist
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </PageContainer>
  );
}
