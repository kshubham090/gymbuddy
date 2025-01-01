import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from 'lucide-react';

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: { 
    name: string; 
    sets: number; 
    reps: number; 
    targetMuscle: string;
  }) => void;
}

const muscleGroups = [
  'Upper Body', 'Core', 'Lower Body', 'Full Body', 'Cardio', 'Flexibility'
];

const AddExerciseModal = ({ isOpen, onClose, onSave }: AddExerciseModalProps) => {
  const [step, setStep] = useState<'muscle' | 'details'>('muscle');
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [selectedMuscle, setSelectedMuscle] = useState('');

  const handleSave = () => {
    onSave({
      name: exerciseName,
      sets: parseInt(sets),
      reps: parseInt(reps),
      targetMuscle: selectedMuscle,
    });
    setExerciseName('');
    setSets('3');
    setReps('12');
    setSelectedMuscle('');
    setStep('muscle');
    onClose();
  };

  const handleMuscleSelect = (muscle: string) => {
    setSelectedMuscle(muscle);
    setStep('details');
  };

  const handleBack = () => {
    setStep('muscle');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black text-gym-text border-gym-accent/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step === 'muscle' ? 'Select Target Area' : 'Add Exercise Details'}
          </DialogTitle>
          <DialogDescription className="text-gym-accent">
            {step === 'muscle' 
              ? 'Choose the primary area you want to target'
              : `Adding exercise for ${selectedMuscle}`
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'muscle' ? (
          <div className="grid grid-cols-2 gap-4 py-4">
            {muscleGroups.map((muscle) => (
              <Button
                key={muscle}
                onClick={() => handleMuscleSelect(muscle)}
                className="bg-black/40 hover:bg-black/60 text-gym-text border border-gym-accent/20 flex items-center justify-between group"
              >
                {muscle}
                <ChevronRight className="w-4 h-4 text-gym-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Exercise Name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="bg-black/40 text-gym-text border-gym-accent/20"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gym-accent">Sets</label>
                <Input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  className="bg-black/40 text-gym-text border-gym-accent/20"
                />
              </div>
              <div>
                <label className="text-sm text-gym-accent">Reps</label>
                <Input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="bg-black/40 text-gym-text border-gym-accent/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleBack} className="bg-black/40 hover:bg-black/60 text-gym-text border border-gym-accent/20">
                Back
              </Button>
              <Button 
                onClick={handleSave} 
                className="flex-1 bg-gym-accent text-black hover:bg-gym-accent/90"
                disabled={!exerciseName}
              >
                Add Exercise
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseModal;