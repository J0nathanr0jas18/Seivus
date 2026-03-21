import { Link } from "react-router-dom";
import { Goal } from "@/data/dummyData";
import ProgressBar from "./ProgressBar";
import { Target, ArrowRight, CheckCircle2 } from "lucide-react";
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
      <Link
        to={`/goal/${goal.id}`}
        className="block group"
      >
        <div className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isComplete ? "bg-success/10" : "bg-primary/10"}`}>
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Target className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-card-foreground">{goal.name}</h3>
                {goal.deadline && (
                  <p className="text-xs text-muted-foreground">
                    Due {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          <ProgressBar value={pct} size="sm" className="mb-3" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ${goal.savedAmount.toLocaleString()} <span className="text-xs">/ ${goal.targetAmount.toLocaleString()}</span>
            </span>
            <span className={`font-semibold ${isComplete ? "text-success" : "text-primary"}`}>
              {isComplete ? "Complete!" : `${pct}%`}
            </span>
          </div>
          {!isComplete && remaining > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              ${remaining.toLocaleString()} remaining
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
