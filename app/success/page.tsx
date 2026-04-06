import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="text-7xl">🎉</div>
        <h1 className="text-4xl font-black text-orange-500">You&apos;re In!</h1>
        <p className="text-xl text-stone-300">
          Thanks for grabbing lifetime access to FlintReady Prep Planner.
        </p>
        <p className="text-stone-400">
          You can now save, update, and revisit your checklist anytime. Stay ready.
        </p>
        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/quiz"
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-8 py-3 rounded-xl transition-colors"
          >
            Build Your Checklist →
          </Link>
          <a
            href="https://youtube.com/@FlintReady"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-300 text-sm underline"
          >
            Check out FlintReady on YouTube
          </a>
        </div>
      </div>
    </main>
  );
}
