import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useGoals } from "@/hooks/useGoals";

export default function CreateGoal() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const navigate = useNavigate();
  const { addGoal } = useGoals();

  const targetNum = parseFloat(target) || 0;

  const daysUntilDeadline = deadline
    ? Math.max(1, Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  const dailySuggestion = daysUntilDeadline ? (targetNum / daysUntilDeadline).toFixed(2) : (targetNum / 90).toFixed(2);
  const weeklySuggestion = daysUntilDeadline ? (targetNum / (daysUntilDeadline / 7)).toFixed(2) : (targetNum / 12).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && targetNum > 0) {
      setShowPlan(true);
    }
  };

  const handleCreate = async () => {
    if (name && targetNum > 0) {
      await addGoal({ name, targetAmount: targetNum, deadline: deadline || undefined });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Crear una Meta</h1>

        {!showPlan ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label>Nombre de la meta</Label>
              <Input placeholder="ej. iPhone nuevo, Vacaciones, Fondo de emergencia" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Monto objetivo ($)</Label>
              <Input type="number" min="1" step="0.01" placeholder="1000" value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fecha límite (opcional)</Label>
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground">
              Calcular Plan
            </Button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-card rounded-2xl p-6 shadow-card border">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-card-foreground">Tu Plan de Ahorro</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Para alcanzar <span className="font-semibold text-card-foreground">${targetNum.toLocaleString()}</span> para "{name}"
                {daysUntilDeadline && ` en ${daysUntilDeadline} días`}:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <p className="text-2xl font-heading font-bold text-primary">${dailySuggestion}</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <p className="text-2xl font-heading font-bold text-accent">${weeklySuggestion}</p>
                  <p className="text-xs text-muted-foreground">por semana</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowPlan(false)}>
                Editar
              </Button>
              <Button className="flex-1 gradient-primary text-primary-foreground" onClick={handleCreate}>
                Comenzar a Ahorrar
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
