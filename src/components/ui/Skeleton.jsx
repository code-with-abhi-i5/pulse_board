export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card p-6 space-y-4 ${className}`}>
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-5/6" />
      <div className="skeleton h-8 w-1/3 mt-2" />
    </div>
  )
}

export function SkeletonLine({ width = 'w-full', height = 'h-3' }) {
  return <div className={`skeleton ${width} ${height}`} />
}

export function SkeletonImage({ className = '' }) {
  return <div className={`skeleton aspect-video w-full ${className}`} />
}

export function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonCard
