import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddExerciseModal from "@/components/AddExerciseModal";
import ExerciseCard from "@/components/ExerciseCard";
import { ArrowLeft, Plus, Music2, ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
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
}

const WorkoutDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isMusicPlayerExpanded, setIsMusicPlayerExpanded] = useState(false);
  const [musicService, setMusicService] = useState<'youtube' | 'spotify'>('youtube');

  useEffect(() => {
    const savedExercises = localStorage.getItem(`workout_${day}`);
    const lastCheckedDate = localStorage.getItem("lastCheckedDate");
    const today = new Date().toLocaleDateString();

    if (savedExercises) {
      const parsedExercises: Exercise[] = JSON.parse(savedExercises);
      if (lastCheckedDate !== today) {
        parsedExercises.forEach((exercise) => (exercise.isChecked = false));
        localStorage.setItem("lastCheckedDate", today);
      }
      setExercises(parsedExercises);
    }
  }, [day]);

  const handleAddExercise = (exercise: Omit<Exercise, 'id' | 'isChecked' | 'note' | 'pr'>) => {
    const newExercise = {
      ...exercise,
      id: crypto.randomUUID(),
      isChecked: false,
    };
    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleDeleteExercise = (id: string) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleSaveNote = (id: string, note: string) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id ? { ...exercise, note } : exercise
    );
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleSavePR = (id: string, prValue: string) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        const currentPR = exercise.pr;
        let newHistory = currentPR?.history || [];
        
        // If there's a current PR, add it to history
        if (currentPR) {
          newHistory = [...newHistory, { value: currentPR.value, date: currentPR.date }];
        }

        // Sort history to find the highest PR
        const allPRs = [...newHistory, { value: prValue, date: new Date().toISOString() }];
        const highestPR = allPRs.reduce((max, current) => 
          Number(current.value) > Number(max.value) ? current : max
        , allPRs[0]);

        return {
          ...exercise,
          pr: {
            value: highestPR.value,
            date: highestPR.date,
            history: newHistory.slice(-5), // Keep only last 5 PRs in history
          },
        };
      }
      return exercise;
    });
    
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleCheckboxChange = (id: string) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id ? { ...exercise, isChecked: !exercise.isChecked } : exercise
    );
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  return (
    <div className="min-h-screen bg-black text-gym-text">
      <header className="bg-black backdrop-blur-sm p-4 flex items-center gap-4 border-b border-gym-accent/20 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-gym-text hover:text-gym-accent"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold capitalize">{day} Workout</h1>
        <div className="flex gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMusicService(musicService === 'youtube' ? 'spotify' : 'youtube')}
            className="text-gym-accent hover:text-gym-accent/80"
          >
            <Music2 className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMusicPlayerExpanded(!isMusicPlayerExpanded)}
            className="text-gym-accent hover:text-gym-accent/80"
          >
            {isMusicPlayerExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      <main className="p-4 pb-96 max-w-2xl mx-auto">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              {...exercise}
              onCheckboxChange={handleCheckboxChange}
              onDelete={handleDeleteExercise}
              onSaveNote={handleSaveNote}
              onSavePR={handleSavePR}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gym-accent/60">
            No exercises added yet. Click the + button to add exercises.
          </div>
        )}

        <Button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gym-accent hover:bg-gym-accent/90 text-black"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-gym-accent/20 transition-all duration-300 ${
          isMusicPlayerExpanded ? "h-3/5" : "h-14"
        }`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsMusicPlayerExpanded(!isMusicPlayerExpanded)}
        >
          <span className="text-gym-accent">{musicService === 'youtube' ? 'YouTube Music' : 'Spotify'}</span>
          <span className="text-gym-accent">
            {isMusicPlayerExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </span>
        </div>
        {isMusicPlayerExpanded && (
          musicService === 'youtube' ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/videoseries?si=mesmokfisakvWsgg&list=PL9PwPs7-UT5xfmBfQ3UIbgDv7WWPvdCTy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[calc(100%-3rem)]"
            />
          ) : (
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX70RN3TfWWJh?utm_source=generator"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full h-[calc(100%-3rem)]"
            />
          )
        )}
      </div>

      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExercise}
      />
    </div>
  );
};

export default WorkoutDay;