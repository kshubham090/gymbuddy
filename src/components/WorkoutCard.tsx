import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock, Dumbbell } from 'lucide-react';

interface WorkoutCardProps {
  day: string;
  duration?: string;
  exerciseCount: number;
  onClick: () => void;
}

const WorkoutCard = ({ day, duration = "Plan your workout", exerciseCount, onClick }: WorkoutCardProps) => {
  return (
    <Card 
      className="bg-gym-medium text-white p-6 rounded-lg cursor-pointer hover:bg-gym-light transition-colors"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-4">{day}</h3>
      <div className="flex items-center gap-2 text-sm opacity-80">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>
      <div className="flex items-center gap-2 text-sm opacity-80 mt-2">
        <Dumbbell className="w-4 h-4" />
        <span>{exerciseCount} exercises</span>
      </div>
    </Card>
  );
};

export default WorkoutCard;