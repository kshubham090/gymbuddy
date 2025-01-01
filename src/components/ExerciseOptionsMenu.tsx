import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, StickyNote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ExerciseOptionsMenuProps {
  exerciseId: string;
  onDelete: () => void;
  onSaveNote: (note: string) => void;
  currentNote?: string;
}

const ExerciseOptionsMenu = ({ exerciseId, onDelete, onSaveNote, currentNote }: ExerciseOptionsMenuProps) => {
  const [note, setNote] = useState(currentNote || '');
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveNote = () => {
    onSaveNote(note);
    setIsNoteDialogOpen(false);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-gym-text hover:bg-gym-accent/20">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gym-medium border-gym-accent/20">
        <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-gym-text">
              <StickyNote className="mr-2 h-4 w-4" />
              Add Note
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="bg-gym-medium border-gym-accent/20">
            <DialogHeader>
              <DialogTitle className="text-gym-text">Add a note to your exercise</DialogTitle>
            </DialogHeader>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[100px] bg-gym-dark text-gym-text"
            />
            <Button onClick={handleSaveNote} className="bg-gym-accent text-gym-dark hover:bg-gym-accent/90">Save Note</Button>
          </DialogContent>
        </Dialog>
        <DropdownMenuItem className="text-red-400 hover:text-red-300" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Exercise
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExerciseOptionsMenu;