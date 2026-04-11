import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const motivationalMessages = [
  "🎉 ¡Excelente! Cada peso cuenta para alcanzar tu sueño.",
  "💪 ¡Sigue así! Estás más cerca de tu meta.",
  "🌟 ¡Increíble! Tu disciplina te llevará lejos.",
  "🚀 ¡Genial! Pequeños pasos, grandes resultados.",
  "🔥 ¡Imparable! Tu futuro yo te lo agradecerá.",
  "✨ ¡Bravo! Ahorrar hoy es invertir en tu felicidad.",
  "🏆 ¡Campeón/a del ahorro! No pares.",
  "💰 ¡Eso es! Tu alcancía está creciendo.",
  "🎯 ¡Directo al objetivo! Vas por buen camino.",
  "🙌 ¡Fantástico! La constancia es la clave del éxito.",
];

function getRandomMessage() {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

interface AddSavingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number, date: string) => void;
  goalName?: string;
}

export default function AddSavingModal({ open, onClose, onSubmit, goalName }: AddSavingModalProps) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (num > 0) {
      onSubmit(num, date);
      setAmount("");
      onClose();
      toast.success(getRandomMessage(), {
        description: `+$${num.toLocaleString()} ahorrados${goalName ? ` para "${goalName}"` : ""}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {goalName ? `Agregar ahorro a "${goalName}"` : "¿Cuánto ahorraste hoy?"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Monto ($)</Label>
            <Input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              className="text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label>Fecha</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
