import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: { name: string; sets: number; reps: number; category: string }) => void;
}

const AddExerciseModal = ({ isOpen, onClose, onSave }: AddExerciseModalProps) => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [category, setCategory] = useState('Chest');

  const handleSave = () => {
    onSave({
      name: exerciseName,
      sets: parseInt(sets),
      reps: parseInt(reps),
      category,
    });
    setExerciseName('');
    setSets('3');
    setReps('12');
    setCategory('Chest');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gym-dark text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Exercise for Workout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setCategory('Chest')}
              className={`${category === 'Chest' ? 'bg-gym-light' : 'bg-gym-medium'} text-white`}
            >
              Chest
            </Button>
            <Button
              onClick={() => setCategory('Back')}
              className={`${category === 'Back' ? 'bg-gym-light' : 'bg-gym-medium'} text-white`}
            >
              Back
            </Button>
          </div>
          <Input
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="bg-gym-medium text-white border-gym-light"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Sets</label>
              <Input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="bg-gym-medium text-white border-gym-light"
              />
            </div>
            <div>
              <label className="text-sm">Reps</label>
              <Input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-gym-medium text-white border-gym-light"
              />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full bg-gym-light hover:bg-gym-medium">
            Add Exercise
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseModal;