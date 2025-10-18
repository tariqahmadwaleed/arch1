export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-secondary rounded" />
          <div className="h-4 w-full max-w-2xl bg-secondary rounded" />
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-secondary rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
