import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock, Dumbbell, ChevronRight } from 'lucide-react';

interface WorkoutCardProps {
  day: string;
  duration?: string;
  exerciseCount: number;
  onClick: () => void;
}

const WorkoutCard = ({ day, duration = "Plan your workout", exerciseCount, onClick }: WorkoutCardProps) => {
  return (
    <Card 
      className="bg-black/40 hover:bg-black/60 text-gym-text p-4 rounded-xl cursor-pointer transition-all border border-gym-accent/20 flex items-center justify-between group"
      onClick={onClick}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{day}</h3>
        <div className="flex items-center gap-4 text-sm text-gym-accent">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <span>{exerciseCount} exercises</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gym-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
};

export default WorkoutCard;