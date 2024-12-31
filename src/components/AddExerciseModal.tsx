import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: { 
    name: string; 
    sets: number; 
    reps: number; 
    category: string;
    muscles: string[];
  }) => void;
}

const muscleGroups = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps',
  'Legs', 'Calves', 'Core', 'Forearms'
];

const AddExerciseModal = ({ isOpen, onClose, onSave }: AddExerciseModalProps) => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [category, setCategory] = useState('Chest');
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const handleSave = () => {
    onSave({
      name: exerciseName,
      sets: parseInt(sets),
      reps: parseInt(reps),
      category,
      muscles: selectedMuscles,
    });
    setExerciseName('');
    setSets('3');
    setReps('12');
    setCategory('Chest');
    setSelectedMuscles([]);
    onClose();
  };

  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles(prev => 
      prev.includes(muscle) 
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#16324f] text-white border-[#18435a]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Exercise for Workout</DialogTitle>
          <DialogDescription className="text-gray-300">
            Fill in the exercise details and select target muscle groups
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setCategory('Chest')}
              className={`${category === 'Chest' ? 'bg-[#18435a]' : 'bg-[#16324f]'} text-white`}
            >
              Chest
            </Button>
            <Button
              onClick={() => setCategory('Back')}
              className={`${category === 'Back' ? 'bg-[#18435a]' : 'bg-[#16324f]'} text-white`}
            >
              Back
            </Button>
          </div>
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
          <div>
            <label className="text-sm mb-2 block">Target Muscles</label>
            <div className="grid grid-cols-3 gap-2">
              {muscleGroups.map((muscle) => (
                <Button
                  key={muscle}
                  onClick={() => toggleMuscle(muscle)}
                  className={`${
                    selectedMuscles.includes(muscle) 
                      ? 'bg-[#18435a]' 
                      : 'bg-[#13293d]'
                  } text-white text-sm p-2 h-auto`}
                >
                  {selectedMuscles.includes(muscle) && (
                    <Check className="w-4 h-4 mr-1" />
                  )}
                  {muscle}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} className="w-full bg-[#18435a] hover:bg-[#13293d]">
            Add Exercise
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseModal;