import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AddExerciseModal from '@/components/AddExerciseModal';
import { ArrowLeft, Plus } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  category: string;
}

const WorkoutDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: 'incline bench press',
      sets: 3,
      reps: 12,
      category: 'Chest'
    }
  ]);

  const handleAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white">
      <header className="bg-gym-medium p-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="text-white hover:bg-gym-light"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold capitalize">{day} Workout</h1>
      </header>

      <main className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 capitalize">{exercises[0]?.category || 'No exercises yet'}</h2>
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <Card key={index} className="bg-gym-medium p-4">
                <h3 className="text-lg font-medium capitalize">{exercise.name}</h3>
                <p className="text-sm opacity-80">{exercise.sets} sets × {exercise.reps} reps</p>
              </Card>
            ))}
          </div>
        </div>

        <Button
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gym-light hover:bg-gym-medium"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>

      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExercise}
      />
    </div>
  );
};

export default WorkoutDay;