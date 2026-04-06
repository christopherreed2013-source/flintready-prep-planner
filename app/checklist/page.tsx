"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ChecklistSection = {
  title: string;
  emoji: string;
  items: { name: string; note?: string; affiliate?: string }[];
};

function generateChecklist(params: Record<string, string>): ChecklistSection[] {
  const sections: ChecklistSection[] = [];

  // --- WATER ---
  const householdSize = params.household_size || "2";
  const sizeNum = householdSize === "1" ? 1 : householdSize === "2" ? 2 : householdSize === "3–4" ? 4 : 6;
  const gallons72hr = sizeNum * 3;

  sections.push({
    title: "Water",
    emoji: "💧",
    items: [
      { name: `${gallons72hr} gallons stored water (72-hour minimum)`, note: "1 gallon/person/day" },
      { name: "Water filtration (Sawyer Squeeze or LifeStraw)", affiliate: "https://amzn.to/sawyer" },
      { name: "Water purification tablets", affiliate: "https://amzn.to/aquatabs" },
      ...(params.threats?.includes("flood") ? [{ name: "Waterproof container for water storage" }] : []),
    ],
  });

  // --- FOOD ---
  const days = params.prep_level?.includes("Just starting") ? 3 : params.prep_level?.includes("Basics") ? 7 : 30;
  sections.push({
    title: `Food (${days}-day supply)`,
    emoji: "🥫",
    items: [
      { name: `${sizeNum * days * 2} cans of non-perishables (beans, tuna, soup)` },
      { name: "Manual can opener", affiliate: "https://amzn.to/canopener" },
      { name: "Peanut butter (high calorie, long shelf life)" },
      { name: "Rice and dried pasta (sealed buckets)" },
      ...(params.has_kids === "Yes" ? [{ name: "Kid-friendly snacks + comfort foods" }] : []),
      ...(params.has_pets === "Yes" ? [{ name: `${days * 2} days of pet food` }] : []),
    ],
  });

  // --- POWER ---
  sections.push({
    title: "Power & Light",
    emoji: "🔦",
    items: [
      { name: "Flashlights (1 per person + extras)", affiliate: "https://amzn.to/flashlight" },
      { name: "Extra batteries (AA, AAA, D)" },
      { name: "Headlamps for hands-free work", affiliate: "https://amzn.to/headlamp" },
      { name: "Portable power bank (20,000mAh+)", affiliate: "https://amzn.to/powerbank" },
      ...(params.threats?.includes("Power") || params.threats?.includes("grid") ? [
        { name: "Portable solar panel charger", affiliate: "https://amzn.to/solarpanel" },
        { name: "Generator or power station (Goal Zero / Jackery)", affiliate: "https://amzn.to/jackery" },
      ] : []),
    ],
  });

  // --- FIRST AID ---
  sections.push({
    title: "First Aid & Medical",
    emoji: "🩹",
    items: [
      { name: "Comprehensive first aid kit", affiliate: "https://amzn.to/firstaidkit" },
      { name: "Tourniquet (CAT or SOFTT-W)", affiliate: "https://amzn.to/tourniquet" },
      { name: "Nitrile gloves (box of 100)" },
      { name: "30-day supply of prescription medications" },
      { name: "Pain relievers, antidiarrheal, antacids" },
      ...(params.has_kids === "Yes" ? [{ name: "Children's medications (Tylenol, Benadryl)" }] : []),
    ],
  });

  // --- COMMUNICATIONS ---
  sections.push({
    title: "Communications",
    emoji: "📻",
    items: [
      { name: "NOAA Weather Radio (hand-crank)", affiliate: "https://amzn.to/weatherradio" },
      { name: "Battery-powered or solar AM/FM radio" },
      { name: "Whistle (signal for help)" },
      ...(params.threats?.includes("grid") || params.threats?.includes("civil") ? [
        { name: "Baofeng UV-5R two-way radio", affiliate: "https://amzn.to/baofeng" },
        { name: "GMRS/FRS radios for family comms", affiliate: "https://amzn.to/frsradio" },
      ] : []),
    ],
  });

  // --- SHELTER / WARMTH ---
  if (params.climate?.includes("Cold") || params.climate?.includes("Mountain")) {
    sections.push({
      title: "Shelter & Warmth",
      emoji: "🏕️",
      items: [
        { name: "Emergency Mylar blankets (2 per person)", affiliate: "https://amzn.to/mylar" },
        { name: "Sleeping bags rated for your climate", affiliate: "https://amzn.to/sleepingbag" },
        { name: "Propane heater (indoor-safe) + extra fuel", affiliate: "https://amzn.to/propaneheater" },
        { name: "Extra wool blankets" },
        { name: "Weatherproof tarps" },
      ],
    });
  }

  // --- BUG OUT ---
  sections.push({
    title: "Bug Out Bag (72-hr Go Bag)",
    emoji: "🎒",
    items: [
      { name: "Quality backpack (40–60L)", affiliate: "https://amzn.to/bugoutbag" },
      { name: "Copies of important documents (laminated)" },
      { name: "Cash in small bills ($100+ in 1s, 5s, 20s)" },
      { name: "Change of clothes per person" },
      { name: "Paracord (100ft)", affiliate: "https://amzn.to/paracord" },
      { name: "Multi-tool or knife", affiliate: "https://amzn.to/multitool" },
      { name: "Fire starter (lighter + waterproof matches + ferro rod)", affiliate: "https://amzn.to/firestarter" },
    ],
  });

  return sections;
}

function ChecklistContent() {
  const searchParams = useSearchParams();
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const checklist = generateChecklist(params);

  const prepLevel = params.prep_level || "Just starting";
  const threat = params.threats || "General all-hazards";

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black text-orange-500">Your Prep Plan</h1>
          <p className="text-stone-400">
            Customized for: <span className="text-stone-200">{prepLevel}</span> ·{" "}
            <span className="text-stone-200">{threat}</span>
          </p>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-orange-950 border border-orange-700 rounded-xl p-5 text-center space-y-3">
          <p className="font-bold text-lg">Want to save & update this list anytime?</p>
          <p className="text-stone-400 text-sm">
            Get lifetime access — save your plan, track what you&apos;ve bought, and unlock advanced categories.
          </p>
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Unlock Full Access — $19 one-time
          </button>
        </div>

        {/* Checklist Sections */}
        {checklist.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>{section.emoji}</span>
              <span>{section.title}</span>
            </h2>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-stone-900 rounded-lg px-4 py-3">
                  <span className="text-stone-600 mt-0.5">☐</span>
                  <div className="flex-1">
                    <span className="text-stone-200">{item.name}</span>
                    {item.note && (
                      <span className="text-stone-500 text-sm ml-2">({item.note})</span>
                    )}
                    {item.affiliate && (
                      <a
                        href={item.affiliate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-orange-500 text-sm hover:underline"
                      >
                        → Buy on Amazon
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Print / Share */}
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => window.print()}
            className="bg-stone-800 hover:bg-stone-700 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            🖨️ Print Checklist
          </button>
          <a
            href="https://youtube.com/@FlintReady"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800 hover:bg-stone-700 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            📺 More from FlintReady
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center">
        <p className="text-stone-400 text-xl">Building your checklist...</p>
      </main>
    }>
      <ChecklistContent />
    </Suspense>
  );
}
