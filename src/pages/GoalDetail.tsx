import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "@/hooks/useGoals";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import AddSavingModal from "@/components/AddSavingModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Calendar, DollarSign, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function GoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getGoal, addDeposit } = useGoals();
  const [modalOpen, setModalOpen] = useState(false);

  const goal = getGoal(id || "");

  if (!goal) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Meta no encontrada.</p>
        </div>
      </div>
    );
  }

  const pct = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  const remaining = goal.targetAmount - goal.savedAmount;
  const isComplete = pct >= 100;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl overflow-hidden shadow-card border mb-5"
        >
          {goal.image && (
            <div className="relative h-48 overflow-hidden">
              <img src={goal.image} alt={goal.name} className="w-full h-full object-cover" width={800} height={512} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h1 className="absolute bottom-3 left-4 font-heading text-xl font-bold text-white drop-shadow">{goal.name}</h1>
            </div>
          )}
          <div className="p-6">
            {!goal.image && <h1 className="font-heading text-xl font-bold text-card-foreground mb-1">{goal.name}</h1>}
          {goal.deadline && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
              <Calendar className="w-3 h-3" />
              Vence el {new Date(goal.deadline).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}

          <div className="text-center mb-4">
            <p className={`text-4xl font-heading font-bold ${isComplete ? "text-success" : "text-primary"}`}>
              {pct}%
            </p>
            <p className="text-sm text-muted-foreground">completado</p>
          </div>

          <ProgressBar value={pct} size="lg" className="mb-4" />

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <DollarSign className="w-4 h-4 mx-auto text-primary mb-1" />
              <p className="font-semibold text-sm text-card-foreground">${goal.savedAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Ahorrado</p>
            </div>
            <div className="text-center">
              <Target className="w-4 h-4 mx-auto text-accent mb-1" />
              <p className="font-semibold text-sm text-card-foreground">${goal.targetAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Objetivo</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-4 h-4 mx-auto text-warning mb-1" />
              <p className="font-semibold text-sm text-card-foreground">${Math.max(0, remaining).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Restante</p>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Add Saving */}
        {!isComplete && (
          <Button onClick={() => setModalOpen(true)} className="w-full gradient-primary text-primary-foreground gap-2 mb-5">
            <Plus className="w-4 h-4" /> Agregar Ahorro
          </Button>
        )}

        {/* Savings History */}
        <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Historial de Ahorros</h2>
        {goal.deposits.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no hay depósitos.</p>
        ) : (
          <div className="space-y-2">
            {goal.deposits.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-card border"
              >
                <div>
                  <p className="text-sm font-medium text-card-foreground">+${d.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(d.date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <DollarSign className="w-4 h-4 text-primary" />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <AddSavingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(amount, date) => addDeposit(goal.id, amount, date)}
        goalName={goal.name}
      />
    </div>
  );
}
