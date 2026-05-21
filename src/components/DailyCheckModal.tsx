import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Goal } from "@/data/dummyData";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface DailyCheckModalProps {
  open: boolean;
  onClose: () => void;
  goals: Goal[];
  onSubmit: (goalId: string, amount: number) => void;
}

export default function DailyCheckModal({ open, onClose, goals, onSubmit }: DailyCheckModalProps) {
  const [amount, setAmount] = useState("");
  const [goalId, setGoalId] = useState("");

  const activeGoals = goals.filter((g) => g.currentAmount < g.targetAmount);

  const dailyMessages = [
    "☀️ ¡Gran día para ahorrar! Cada moneda suma.",
    "🌈 ¡Hoy diste un paso más hacia tu meta!",
    "⭐ ¡Día productivo! Tu esfuerzo vale la pena.",
    "🎊 ¡Check-in completado! La constancia es tu superpoder.",
    "💎 ¡Valioso aporte! Tu futuro brilla más.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (num > 0 && goalId) {
      const goalName = goals.find((g) => g.id === goalId)?.name;
      onSubmit(goalId, num);
      setAmount("");
      setGoalId("");
      onClose();
      toast.success(dailyMessages[Math.floor(Math.random() * dailyMessages.length)], {
        description: `+$${num.toLocaleString()} ahorrados${goalName ? ` para "${goalName}"` : ""}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Check-In Diario
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">¿Cuánto ahorraste hoy?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Meta</Label>
            <Select value={goalId} onValueChange={setGoalId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una meta" />
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
            <Label>Monto ($)</Label>
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
            Registrar Ahorro
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
