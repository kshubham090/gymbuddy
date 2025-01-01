import React from 'react';
import { Card } from "@/components/ui/card";
import ExerciseOptionsMenu from "./ExerciseOptionsMenu";
import { Checkbox } from "@/components/ui/checkbox";

interface ExerciseCardProps {
  id: string;
  name: string;
  sets: number;
  reps: number;
  targetMuscle: string;
  isChecked: boolean;
  note?: string;
  pr?: {
    value: string;
    date: string;
    history?: Array<{
      value: string;
      date: string;
    }>;
  };
  onCheckboxChange: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveNote: (id: string, note: string) => void;
  onSavePR: (id: string, pr: string) => void;
}

const ExerciseCard = ({
  id,
  name,
  sets,
  reps,
  targetMuscle,
  isChecked,
  note,
  pr,
  onCheckboxChange,
  onDelete,
  onSaveNote,
  onSavePR,
}: ExerciseCardProps) => {
  return (
    <Card className="bg-black/40 backdrop-blur-sm p-4 mb-4 relative border border-gym-accent/20 rounded-xl hover:border-gym-accent/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium capitalize text-gym-text">{name}</h3>
          <p className="text-sm text-gym-accent">{sets} sets × {reps} reps</p>
          <span className="inline-block mt-2 text-xs bg-gym-accent/20 px-2 py-1 rounded-full text-gym-accent">
            {targetMuscle}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          {pr && (
            <div className="text-xs text-gym-accent text-right">
              PR - {pr.value} kg ({new Date(pr.date).toLocaleDateString()})
              {pr.history && pr.history.length > 0 && (
                <div className="text-[10px] text-gym-accent/60">
                  Previous: {pr.history[pr.history.length - 1].value} kg
                </div>
              )}
            </div>
          )}
          <div className="flex items-center gap-2">
            <ExerciseOptionsMenu
              exerciseId={id}
              onDelete={() => onDelete(id)}
              onSaveNote={(note) => onSaveNote(id, note)}
              onSavePR={(pr) => onSavePR(id, pr)}
              currentNote={note}
              currentPR={pr?.value}
            />
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => onCheckboxChange(id)}
              className="h-4 w-4 border-gym-accent/40 data-[state=checked]:bg-gym-accent data-[state=checked]:border-gym-accent"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;