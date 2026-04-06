import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo / Brand */}
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-orange-500">
            FlintReady
          </h1>
          <p className="text-xl text-stone-400 font-medium">Prep Planner</p>
        </div>

        {/* Hero */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold leading-tight">
            Your personalized survival checklist — built in 60 seconds.
          </h2>
          <p className="text-stone-400 text-lg">
            Answer 7 quick questions. Get a custom prep plan tailored to your
            household, location, and threat concerns. Print it. Use it. Survive.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/quiz"
          className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl px-10 py-4 rounded-xl transition-colors"
        >
          Build My Prep Plan →
        </Link>

        {/* Trust signals */}
        <div className="flex justify-center gap-8 text-stone-500 text-sm pt-4">
          <span>✓ 100% Free</span>
          <span>✓ No account required</span>
          <span>✓ Printable PDF</span>
        </div>
      </div>
    </main>
  );
}
