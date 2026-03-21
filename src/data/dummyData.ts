export interface Deposit {
  id: string;
  date: string;
  amount: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;
  createdAt: string;
  deposits: Deposit[];
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
}

export const dummyUser: User = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinedAt: "2025-01-15",
};

export const dummyGoals: Goal[] = [
  {
    id: "1",
    name: "MacBook Pro",
    targetAmount: 2500,
    savedAmount: 1875,
    deadline: "2026-06-01",
    createdAt: "2025-12-01",
    deposits: [
      { id: "d1", date: "2026-03-20", amount: 50 },
      { id: "d2", date: "2026-03-19", amount: 35 },
      { id: "d3", date: "2026-03-18", amount: 40 },
      { id: "d4", date: "2026-03-17", amount: 25 },
      { id: "d5", date: "2026-03-15", amount: 60 },
      { id: "d6", date: "2026-03-14", amount: 30 },
      { id: "d7", date: "2026-03-12", amount: 45 },
      { id: "d8", date: "2026-03-10", amount: 50 },
      { id: "d9", date: "2026-03-08", amount: 20 },
      { id: "d10", date: "2026-03-05", amount: 55 },
    ],
  },
  {
    id: "2",
    name: "Vacation to Japan",
    targetAmount: 5000,
    savedAmount: 1200,
    deadline: "2026-12-15",
    createdAt: "2026-01-10",
    deposits: [
      { id: "d11", date: "2026-03-21", amount: 100 },
      { id: "d12", date: "2026-03-18", amount: 75 },
      { id: "d13", date: "2026-03-14", amount: 50 },
      { id: "d14", date: "2026-03-10", amount: 80 },
    ],
  },
  {
    id: "3",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 4500,
    createdAt: "2025-06-01",
    deposits: [
      { id: "d15", date: "2026-03-20", amount: 200 },
      { id: "d16", date: "2026-03-16", amount: 150 },
      { id: "d17", date: "2026-03-11", amount: 100 },
    ],
  },
  {
    id: "4",
    name: "New Bicycle",
    targetAmount: 800,
    savedAmount: 800,
    deadline: "2026-04-01",
    createdAt: "2026-01-20",
    deposits: [
      { id: "d18", date: "2026-03-15", amount: 100 },
      { id: "d19", date: "2026-03-01", amount: 200 },
    ],
  },
];
