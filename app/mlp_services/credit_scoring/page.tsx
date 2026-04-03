import PlaygroundCredit from "../../../components/PlaygroundCredit";

export default function Credit_scoring() {
  return (
    // Lienzo principal oscuro con el mismo padding que el resto de tu app
    <main className="min-h-screen bg-zinc-950 px-6 py-24 relative overflow-hidden">
      
      {/* Contenedor centralizado para mantener proporciones perfectas */}
      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Cabecera de la página */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Credit Scoring Model
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:mx-0">
            Interactive machine learning playground. Adjust the parameters below 
            to simulate how different demographic and financial factors influence 
            the final credit risk prediction.
          </p>
        </div>

        {/* Línea divisoria elegante con gradiente */}
        <div className="mb-12 h-px w-full bg-gradient-to-r from-zinc-800/20 via-zinc-700/50 to-zinc-800/20" />

        {/* Contenedor del Playground con un leve brillo de fondo */}
        <div className="relative">
          {/* El resplandor mágico detrás del componente (Ambient Glow) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500/5 blur-[120px]" />
          
          <PlaygroundCredit />
        </div>

      </div>
    </main>
  );
}