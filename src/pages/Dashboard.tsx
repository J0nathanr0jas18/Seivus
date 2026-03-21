import { useState } from "react";
import { Link } from "react-router-dom";
import { useGoals } from "@/hooks/useGoals";
import GoalCard from "@/components/GoalCard";
import DailyCheckModal from "@/components/DailyCheckModal";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, TrendingUp, Target, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { goals, addDeposit } = useGoals();
  const [dailyCheckOpen, setDailyCheckOpen] = useState(false);

  const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0);
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
  const activeGoals = goals.filter((g) => g.savedAmount < g.targetAmount).length;

  const stats = [
    { label: "Total Saved", value: `$${totalSaved.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
    { label: "Active Goals", value: activeGoals, icon: Target, color: "text-accent" },
    { label: "Overall Progress", value: `${Math.round((totalSaved / totalTarget) * 100)}%`, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Track your savings goals</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDailyCheckOpen(true)}
              className="gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Daily Check</span>
            </Button>
            <Button asChild size="sm" className="gradient-primary text-primary-foreground gap-1.5">
              <Link to="/create-goal">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Goal</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-4 shadow-card border text-center"
            >
              <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
              <p className="font-heading text-lg font-bold text-card-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Goals */}
        <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Your Goals</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-16">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No goals yet. Create your first one!</p>
          </div>
        )}
      </main>

      <DailyCheckModal
        open={dailyCheckOpen}
        onClose={() => setDailyCheckOpen(false)}
        goals={goals}
        onSubmit={addDeposit}
      />
    </div>
  );
}
