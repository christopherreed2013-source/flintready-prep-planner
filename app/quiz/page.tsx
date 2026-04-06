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
    options: ["Cold / Northern", "Hot / Southern", "Coastal", "Mountainous", "Midwest / Plains"],
  },
  {
    id: "threats",
    question: "What threats concern you most? (pick your top one)",
    type: "choice",
    options: [
      "Power outages / winter storms",
      "Hurricanes / flooding",
      "Earthquakes",
      "Civil unrest / grid-down",
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
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);

  const q = questions[current];
  const progress = Math.round(((current) / questions.length) * 100);

  function handleAnswer(answer: string) {
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowEmail(true);
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ ...answers, email });
    router.push(`/checklist?${params.toString()}`);
  }

  if (showEmail) {
    return (
      <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl w-full space-y-6 text-center">
          <h2 className="text-3xl font-bold">Your plan is ready!</h2>
          <p className="text-stone-400">
            Enter your email to get your personalized checklist + we&apos;ll
            send you updates when new prep resources drop.
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
            onClick={() => {
              const params = new URLSearchParams({ ...answers, email: "skip" });
              router.push(`/checklist?${params.toString()}`);
            }}
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
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full text-left bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-orange-500 rounded-xl px-5 py-4 text-lg transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
