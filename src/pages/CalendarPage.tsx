import { useState } from "react";
import { useGoals } from "@/hooks/useGoals";
import Navbar from "@/components/Navbar";
import CalendarView from "@/components/CalendarView";
import AddSavingModal from "@/components/AddSavingModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function CalendarPage() {
  const { goals, getAllDeposits, addDeposit } = useGoals();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState("");

  const allDeposits = getAllDeposits();
  const activeGoals = goals.filter((g) => g.savedAmount < g.targetAmount);

  const depositsForDate = selectedDate
    ? allDeposits.filter((d) => d.date === selectedDate)
    : [];

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddFromCalendar = () => {
    if (activeGoals.length === 1) {
      setSelectedGoalId(activeGoals[0].id);
    }
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-6">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Calendario de Actividad</h1>
        <p className="text-sm text-muted-foreground mb-6">Rastrea tu actividad diaria de ahorro</p>

        <CalendarView deposits={allDeposits} onDayClick={handleDayClick} />

        {/* Selected Day Detail */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-card rounded-2xl p-5 shadow-card border"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-card-foreground">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <button onClick={handleAddFromCalendar} className="text-sm text-primary font-medium hover:underline">
                + Registrar ahorro
              </button>
            </div>

            {depositsForDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin actividad este día.</p>
            ) : (
              <div className="space-y-2">
                {depositsForDate.map((d) => (
                  <div key={d.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{d.goalName}</span>
                    <span className="font-semibold text-card-foreground">+${d.amount}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex items-center justify-between text-sm font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-primary">${depositsForDate.reduce((s, d) => s + d.amount, 0)}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Goal selector for calendar add */}
        {modalOpen && activeGoals.length > 1 && !selectedGoalId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-card rounded-xl p-4 shadow-card border">
            <p className="text-sm text-muted-foreground mb-2">¿A qué meta?</p>
            <Select value={selectedGoalId} onValueChange={(v) => { setSelectedGoalId(v); }}>
              <SelectTrigger><SelectValue placeholder="Selecciona una meta" /></SelectTrigger>
              <SelectContent>
                {activeGoals.map((g) => (
                  <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        )}

        {selectedGoalId && (
          <AddSavingModal
            open={modalOpen}
            onClose={() => { setModalOpen(false); setSelectedGoalId(""); }}
            onSubmit={(amount, date) => addDeposit(selectedGoalId, amount, date)}
            goalName={goals.find((g) => g.id === selectedGoalId)?.name}
          />
        )}
      </main>
    </div>
  );
}
