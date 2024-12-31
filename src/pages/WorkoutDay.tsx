import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddExerciseModal from "@/components/AddExerciseModal";
import { ArrowLeft, Plus, Music2, Trash2, ChevronDown, ChevronUp } from "lucide-react"; // Add these imports

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  targetMuscle: string;
  isChecked: boolean;
}

const WorkoutDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isMusicPlayerExpanded, setIsMusicPlayerExpanded] = useState(false);

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

  const handleAddExercise = (exercise: Exercise) => {
    const updatedExercises = [...exercises, { ...exercise, isChecked: false }];
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, isChecked: !exercise.isChecked } : exercise
    );
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  return (
    <div className="min-h-screen bg-[#13293d] text-white">
      <header className="bg-[#16324f] p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-white hover:bg-[#18435a]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold capitalize">{day} Workout</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMusicPlayerExpanded(!isMusicPlayerExpanded)}
          className="ml-auto text-white hover:bg-[#18435a]"
        >
          <Music2 className="w-6 h-6" />
        </Button>
      </header>

      <main className="p-4 pb-24">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm p-4 mb-4 relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium capitalize text-white">
                    {exercise.name}
                  </h3>
                  <p className="text-sm text-white/90">
                    {exercise.sets} sets × {exercise.reps} reps
                  </p>
                  <span className="inline-block mt-2 text-xs bg-[#18435a]/80 px-2 py-1 rounded text-white/90">
                    {exercise.targetMuscle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exercise.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                    className="text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteExercise(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-white/60">
            No exercises added yet. Click the + button to add exercises.
          </div>
        )}

        <Button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-[#18435a] hover:bg-[#16324f]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#16324f] transition-transform ${
          isMusicPlayerExpanded ? "h-3/5" : "h-14"
        }`}
      >
        <div
          className="flex justify-between items-center p-2 cursor-pointer"
          onClick={() => setIsMusicPlayerExpanded(!isMusicPlayerExpanded)}
        >
          <span className="text-white "> YouTube</span>
          {/* Use icons instead of text */}
          <span className="text-white">
            {isMusicPlayerExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </span>
        </div>
        <iframe
          src="https://www.youtube-nocookie.com/embed/videoseries?si=mesmokfisakvWsgg&list=PL9PwPs7-UT5xfmBfQ3UIbgDv7WWPvdCTy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={`w-full ${isMusicPlayerExpanded ? "h-[calc(100%-3rem)]" : "hidden"}`}
        />
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
