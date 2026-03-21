import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Goal } from "@/data/dummyData";
import { Sparkles } from "lucide-react";

interface DailyCheckModalProps {
  open: boolean;
  onClose: () => void;
  goals: Goal[];
  onSubmit: (goalId: string, amount: number) => void;
}

export default function DailyCheckModal({ open, onClose, goals, onSubmit }: DailyCheckModalProps) {
  const [amount, setAmount] = useState("");
  const [goalId, setGoalId] = useState("");

  const activeGoals = goals.filter((g) => g.savedAmount < g.targetAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (num > 0 && goalId) {
      onSubmit(goalId, num);
      setAmount("");
      setGoalId("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Daily Check-In
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">How much did you save today?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Goal</Label>
            <Select value={goalId} onValueChange={setGoalId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a goal" />
              </SelectTrigger>
              <SelectContent>
                {activeGoals.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Amount ($)</Label>
            <Input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">
            Log Saving
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
