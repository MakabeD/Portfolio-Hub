import PlaygroundChurn from "../../../../components/PlaygroundChurn";

export default function MobileChurn() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Mobile Churn Prediction
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:mx-0">
            Interactive machine learning playground. Adjust customer account details,
            usage patterns, and billing data to predict the likelihood of customer churn.
          </p>
        </div>
        <div className="mb-12 h-px w-full bg-gradient-to-r from-zinc-800/20 via-zinc-700/50 to-zinc-800/20" />
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500/5 blur-[120px]" />
          <PlaygroundChurn />
        </div>
      </div>
    </main>
  );
}
