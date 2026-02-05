import GradientText from "@/components/GradientText";

export default function Loading() {
  return (
    <main className="min-h-screen bg-transparent pt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <GradientText
            className="text-6xl font-bold tracking-tight py-2"
            colors={["#ffbb29","#f16fc8","#3d0cdf"]}
            animationSpeed={6}
            showBorder={false}
          >
            Typing Store
          </GradientText>
          <p className="text-muted-foreground text-xl mt-4">
            Best budget gear for your setup.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
              <div className="aspect-square bg-zinc-900 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 bg-zinc-900 rounded-lg animate-pulse" />
                <div className="h-8 w-1/4 bg-zinc-900 rounded-lg animate-pulse" />
                <div className="h-12 w-full bg-zinc-900 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}