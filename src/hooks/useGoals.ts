import { useState } from "react";
import { dummyGoals, Goal, Deposit } from "@/data/dummyData";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(dummyGoals);

  const addGoal = (goal: Omit<Goal, "id" | "deposits" | "createdAt" | "savedAmount">) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      savedAmount: 0,
      deposits: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setGoals((prev) => [...prev, newGoal]);
    return newGoal;
  };

  const addDeposit = (goalId: string, amount: number, date?: string) => {
    const deposit: Deposit = {
      id: Date.now().toString(),
      date: date || new Date().toISOString().split("T")[0],
      amount,
    };
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, savedAmount: g.savedAmount + amount, deposits: [deposit, ...g.deposits] }
          : g
      )
    );
  };

  const getGoal = (id: string) => goals.find((g) => g.id === id);

  const getAllDeposits = () =>
    goals.flatMap((g) => g.deposits.map((d) => ({ ...d, goalName: g.name, goalId: g.id })));

  return { goals, addGoal, addDeposit, getGoal, getAllDeposits };
}
