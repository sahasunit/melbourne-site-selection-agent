// `industry_type` is freeform text from the source data (e.g. "Cafes and
// Restaurants") — there's no fixed category set, so we group by whatever
// exact strings actually appear rather than assuming specific labels.
export function bucketIndustries(venues, topN = 3) {
  const counts = new Map()
  for (const venue of venues) {
    counts.set(venue.industry_type, (counts.get(venue.industry_type) || 0) + 1)
  }

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])

  // nothing hidden if there isn't more than one extra category beyond topN
  if (sorted.length <= topN + 1) {
    return sorted.map(([label, count]) => ({ label, count }))
  }

  const top = sorted.slice(0, topN).map(([label, count]) => ({ label, count }))
  const otherCount = sorted.slice(topN).reduce((sum, [, count]) => sum + count, 0)
  return [...top, { label: 'Other', count: otherCount }]
}
