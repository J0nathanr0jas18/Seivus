import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CalendarDeposit {
  date: string;
  amount: number;
  goalName: string;
}

interface CalendarViewProps {
  deposits: CalendarDeposit[];
  onDayClick?: (date: string) => void;
}

export default function CalendarView({ deposits, onDayClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const depositsByDate = useMemo(() => {
    const map: Record<string, CalendarDeposit[]> = {};
    deposits.forEach((d) => {
      if (!map[d.date]) map[d.date] = [];
      map[d.date].push(d);
    });
    return map;
  }, [deposits]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const getDateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="bg-card rounded-2xl shadow-card border p-5">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-heading font-semibold text-card-foreground">{monthName}</h3>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {blanks.map((b) => (
            <div key={`blank-${b}`} />
          ))}
          {days.map((day) => {
            const dateStr = getDateStr(day);
            const dayDeposits = depositsByDate[dateStr];
            const hasActivity = !!dayDeposits;
            const totalAmount = dayDeposits?.reduce((sum, d) => sum + d.amount, 0) || 0;

            return (
              <button
                key={day}
                onClick={() => onDayClick?.(dateStr)}
                className={cn(
                  "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all hover:bg-secondary",
                  isToday(day) && "ring-2 ring-primary",
                  hasActivity && "bg-primary/10 font-semibold text-primary"
                )}
              >
                <span>{day}</span>
                {hasActivity && (
                  <span className="text-[10px] leading-none text-primary font-medium">
                    ${totalAmount}
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
