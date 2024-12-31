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
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs'
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
      <DialogContent className="bg-[#16324f] text-white border-[#18435a]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step === 'muscle' ? 'Select Target Muscle' : 'Add Exercise Details'}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {step === 'muscle' 
              ? 'Choose the primary muscle group you want to target'
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
                className="bg-[#13293d] hover:bg-[#18435a] text-white flex items-center justify-between"
              >
                {muscle}
                <ChevronRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Exercise Name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="bg-[#13293d] text-white border-[#18435a]"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Sets</label>
                <Input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  className="bg-[#13293d] text-white border-[#18435a]"
                />
              </div>
              <div>
                <label className="text-sm">Reps</label>
                <Input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="bg-[#13293d] text-white border-[#18435a]"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleBack} className="bg-[#13293d] hover:bg-[#18435a]">
                Back
              </Button>
              <Button 
                onClick={handleSave} 
                className="flex-1 bg-[#18435a] hover:bg-[#13293d]"
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