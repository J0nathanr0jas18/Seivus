import { Link } from "react-router-dom";
import { Goal } from "@/data/dummyData";
import ProgressBar from "./ProgressBar";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GoalCard({ goal }: { goal: Goal }) {
  const pct = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  const remaining = goal.targetAmount - goal.savedAmount;
  const isComplete = pct >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/goal/${goal.id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border">
          {goal.image && (
            <div className="relative h-32 overflow-hidden">
              <img
                src={goal.image}
                alt={goal.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <h3 className="font-heading font-semibold text-white text-sm drop-shadow">{goal.name}</h3>
                {isComplete && <CheckCircle2 className="w-5 h-5 text-success drop-shadow" />}
              </div>
            </div>
          )}

          <div className="p-4">
            {!goal.image && (
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-card-foreground">{goal.name}</h3>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            )}

            {goal.deadline && (
              <p className="text-xs text-muted-foreground mb-2">
                Vence el {new Date(goal.deadline).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            )}

            <ProgressBar value={pct} size="sm" className="mb-2" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                ${goal.savedAmount.toLocaleString()} <span className="text-xs">/ ${goal.targetAmount.toLocaleString()}</span>
              </span>
              <span className={`font-semibold ${isComplete ? "text-success" : "text-primary"}`}>
                {isComplete ? "¡Completada!" : `${pct}%`}
              </span>
            </div>
            {!isComplete && remaining > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                ${remaining.toLocaleString()} restante
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
