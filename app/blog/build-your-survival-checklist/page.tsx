import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your Custom Survival Checklist in 60 Seconds | FlintReady",
  description:
    "Most emergency prep checklists are generic and useless. Here's how to build one that's actually tailored to your household, location, and threat level — in under a minute.",
  openGraph: {
    title: "Build Your Custom Survival Checklist in 60 Seconds",
    description:
      "Stop using generic prep lists. Answer 7 questions and get a checklist built for YOUR situation.",
    siteName: "FlintReady",
  },
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 px-4 py-16">
      <article className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/" className="text-orange-500 text-sm hover:underline">
            ← FlintReady Prep Planner
          </Link>
          <h1 className="text-4xl font-black leading-tight">
            Build Your Custom Survival Checklist in 60 Seconds
          </h1>
          <p className="text-stone-400 text-sm">
            By FlintReady · April 2026 · 4 min read
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-stone-300 text-lg leading-relaxed">
          <p>
            Here's the problem with most emergency prep checklists: they're written for everyone, which means they're actually written for no one.
          </p>
          <p>
            A single person in Phoenix has completely different needs than a family of five in Minnesota. Someone prepping for hurricanes needs different gear than someone worried about grid-down scenarios in the Midwest.
          </p>
          <p>
            Generic lists waste your money on stuff you don't need and miss critical items you do.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            What a Good Prep Checklist Actually Needs
          </h2>
          <div className="text-stone-300 text-lg leading-relaxed space-y-4">
            <p>A useful prep checklist should account for:</p>
            <ul className="space-y-2 list-none">
              {[
                "👨‍👩‍👧‍👦 Your household size — more people = more water, food, and supplies",
                "🌡️ Your climate — cold weather prep looks nothing like coastal flood prep",
                "⚠️ Your specific threats — power outages, earthquakes, civil unrest all need different tools",
                "📊 Your current level — no point listing things you already have",
                "💰 Your budget — a $25/month budget needs a different strategy than $300/month",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              When you factor all of that in, you get a list that's actually actionable — not overwhelming, not redundant.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            The 5 Categories Every Prepper Needs to Cover
          </h2>
          <div className="text-stone-300 text-lg leading-relaxed space-y-6">
            {[
              {
                emoji: "💧",
                title: "Water",
                body: "FEMA recommends 1 gallon per person per day for at least 3 days. Most people have zero stored. Water is the first thing to address — everything else is secondary.",
              },
              {
                emoji: "🥫",
                title: "Food",
                body: "Focus on calorie density and shelf life. Canned goods, rice, pasta, peanut butter. Don't forget a manual can opener — useless to have cans and no way to open them.",
              },
              {
                emoji: "🔦",
                title: "Power & Light",
                body: "A power bank, flashlights, and extra batteries will handle most short-term outages. For extended grid-down scenarios, a solar charger or power station becomes critical.",
              },
              {
                emoji: "🩹",
                title: "First Aid & Medical",
                body: "A basic kit isn't enough. You need a tourniquet, extra prescription medications (30-day supply minimum), and knowledge to use what you have.",
              },
              {
                emoji: "🎒",
                title: "Bug Out Bag",
                body: "If you have to leave fast, you need a bag ready to grab. Documents, cash, 72 hours of supplies, and the ability to move.",
              },
            ].map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  {section.emoji} {section.title}
                </h3>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Build Yours in 60 Seconds
          </h2>
          <div className="text-stone-300 text-lg leading-relaxed space-y-4">
            <p>
              We built the FlintReady Prep Planner to solve exactly this problem. Answer 7 questions about your household and situation, and it generates a customized checklist — including prioritized items based on your threat level and budget.
            </p>
            <p>
              It's free to use, printable, and includes links to the exact gear we recommend for each item.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-orange-950 border border-orange-700 rounded-xl p-6 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to build your plan?</h3>
          <p className="text-stone-400">
            Free. Takes 60 seconds. Tailored to your household.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors"
          >
            Build My Prep Plan →
          </Link>
        </div>

        {/* Footer nav */}
        <div className="pt-4 border-t border-stone-800 text-center">
          <a
            href="https://youtube.com/@FlintReady"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            📺 More prep content on the FlintReady YouTube channel
          </a>
        </div>
      </article>
    </main>
  );
}
