import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { dummyUser } from "@/data/dummyData";
import { useGoals } from "@/hooks/useGoals";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Target, DollarSign, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const { goals } = useGoals();
  const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0);
  const totalDeposits = goals.reduce((s, g) => s + g.deposits.length, 0);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-6">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Profile</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-card border mb-5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-card-foreground">{dummyUser.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" /> {dummyUser.email}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3" /> Joined {new Date(dummyUser.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary rounded-xl p-3 text-center">
              <Target className="w-4 h-4 mx-auto text-primary mb-1" />
              <p className="font-heading font-bold text-card-foreground">{goals.length}</p>
              <p className="text-xs text-muted-foreground">Goals</p>
            </div>
            <div className="bg-secondary rounded-xl p-3 text-center">
              <DollarSign className="w-4 h-4 mx-auto text-accent mb-1" />
              <p className="font-heading font-bold text-card-foreground">${totalSaved.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Saved</p>
            </div>
            <div className="bg-secondary rounded-xl p-3 text-center">
              <Calendar className="w-4 h-4 mx-auto text-success mb-1" />
              <p className="font-heading font-bold text-card-foreground">{totalDeposits}</p>
              <p className="text-xs text-muted-foreground">Deposits</p>
            </div>
          </div>
        </motion.div>

        <Button variant="outline" className="w-full gap-2" onClick={() => navigate("/")}>
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </main>
    </div>
  );
}
