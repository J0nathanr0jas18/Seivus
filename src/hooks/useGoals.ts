import { useState, useEffect } from "react";
import { Goal, SavingsHistory } from "@/data/dummyData";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { collection, onSnapshot, query, where, addDoc, doc, writeBatch, increment, collectionGroup } from "firebase/firestore";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [allDeposits, setAllDeposits] = useState<SavingsHistory[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setGoals([]);
      setAllDeposits([]);
      return;
    }

    const q = query(collection(db, "goals"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const goalsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Goal[];
      setGoals(goalsData);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const q = query(collectionGroup(db, "SavingsHistory"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const depositsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SavingsHistory[];
      setAllDeposits(depositsData);
    });

    return () => unsubscribe();
  }, [user]);

  const addGoal = async (goalData: Omit<Goal, "id" | "currentAmount" | "createdAt" | "userId">) => {
    if (!user) return null;
    const newGoal = {
      ...goalData,
      currentAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      userId: user.uid,
    };
    
    const docRef = await addDoc(collection(db, "goals"), newGoal);
    return { ...newGoal, id: docRef.id };
  };

  const addDeposit = async (goalId: string, amount: number, date?: string) => {
    if (!user) return;
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const batch = writeBatch(db);
    
    const historyRef = doc(collection(db, `goals/${goalId}/SavingsHistory`));
    batch.set(historyRef, {
      date: date || new Date().toISOString().split("T")[0],
      amount,
      goalId,
      goalName: goal.name,
      userId: user.uid
    });

    const goalRef = doc(db, "goals", goalId);
    batch.update(goalRef, {
      currentAmount: increment(amount)
    });

    await batch.commit();
  };

  const getGoal = (id: string) => goals.find((g) => g.id === id);

  const getAllDeposits = () => allDeposits;

  return { goals, addGoal, addDeposit, getGoal, getAllDeposits };
}
