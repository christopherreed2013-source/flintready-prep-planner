"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: "household_size",
    question: "How many people are in your household?",
    type: "choice",
    options: ["1", "2", "3–4", "5+"],
  },
  {
    id: "has_kids",
    question: "Do you have children under 12?",
    type: "choice",
    options: ["Yes", "No"],
  },
  {
    id: "has_pets",
    question: "Do you have pets?",
    type: "choice",
    options: ["Yes", "No"],
  },
  {
    id: "climate",
    question: "What's your primary climate/region?",
    type: "choice",
    options: [
      "Cold / Northern",
      "Hot / Southern",
      "Coastal",
      "Mountainous",
      "Midwest / Plains",
      "Europe / UK",
      "Australia / NZ",
      "Other",
    ],
  },
  {
    id: "threats",
    question: "What threats concern you most? (select all that apply)",
    type: "multi",
    options: [
      "Power outages / winter storms",
      "Hurricanes / flooding",
      "Earthquakes",
      "Civil unrest / grid-down",
      "Wildfires",
      "Pandemic / supply chain disruption",
      "General all-hazards",
    ],
  },
  {
    id: "prep_level",
    question: "How prepped are you right now?",
    type: "choice",
    options: [
      "Just starting — I have nothing",
      "Basics covered — some food/water",
      "Intermediate — 30+ days ready",
      "Advanced — looking to fill gaps",
    ],
  },
  {
    id: "budget",
    question: "What's your monthly prep budget?",
    type: "choice",
    options: ["Under $25", "$25–$100", "$100–$300", "$300+"],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);

  const q = questions[current];
  const progress = Math.round(((current) / questions.length) * 100);

  function handleChoice(answer: string) {
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);
    setMultiSelected([]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowEmail(true);
    }
  }

  function toggleMulti(option: string) {
    setMultiSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  }

  function handleMultiNext() {
    const selected = multiSelected.length > 0 ? multiSelected : ["General all-hazards"];
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setMultiSelected([]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowEmail(true);
    }
  }

  function handleBack() {
    if (current > 0) {
      const prevQ = questions[current - 1];
      // Restore previous multi selections if needed
      if (prevQ.type === "multi") {
        const prev = answers[prevQ.id];
        setMultiSelected(Array.isArray(prev) ? prev : []);
      } else {
        setMultiSelected([]);
      }
      setCurrent(current - 1);
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const flat: Record<string, string> = {};
    for (const [k, v] of Object.entries(answers)) {
      flat[k] = Array.isArray(v) ? v.join("|") : v;
    }
    flat.email = email;
    const params = new URLSearchParams(flat);
    router.push(`/checklist?${params.toString()}`);
  }

  function skipEmail() {
    const flat: Record<string, string> = {};
    for (const [k, v] of Object.entries(answers)) {
      flat[k] = Array.isArray(v) ? v.join("|") : v;
    }
    flat.email = "skip";
    const params = new URLSearchParams(flat);
    router.push(`/checklist?${params.toString()}`);
  }

  if (showEmail) {
    return (
      <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl w-full space-y-6 text-center">
          <h2 className="text-3xl font-bold">Your plan is ready!</h2>
          <p className="text-stone-400">
            Enter your email to get your personalized checklist + updates when new prep resources drop.
          </p>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg py-3 rounded-xl transition-colors"
            >
              Show My Checklist →
            </button>
          </form>
          <button
            onClick={skipEmail}
            className="text-stone-500 text-sm underline hover:text-stone-400"
          >
            Skip — just show me the checklist
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-8">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-stone-500">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold">{q.question}</h2>

        {/* Options */}
        {q.type === "choice" && (
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChoice(opt)}
                className="w-full text-left bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-orange-500 rounded-xl px-5 py-4 text-lg transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {q.type === "multi" && (
          <div className="space-y-3">
            {q.options.map((opt) => {
              const selected = multiSelected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleMulti(opt)}
                  className={`w-full text-left border rounded-xl px-5 py-4 text-lg transition-all flex items-center gap-3 ${
                    selected
                      ? "bg-orange-500/20 border-orange-500 text-white"
                      : "bg-stone-800 border-stone-700 hover:border-orange-500 text-stone-200"
                  }`}
                >
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? "bg-orange-500 border-orange-500" : "border-stone-500"}`}>
                    {selected && <span className="text-white text-xs font-bold">✓</span>}
                  </span>
                  {opt}
                </button>
              );
            })}
            <button
              onClick={handleMultiNext}
              disabled={multiSelected.length === 0}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-colors mt-2"
            >
              Next →
            </button>
          </div>
        )}

        {/* Back button */}
        {current > 0 && (
          <button
            onClick={handleBack}
            className="text-stone-500 hover:text-stone-300 text-sm underline transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
    </main>
  );
}
