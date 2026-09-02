// "cbd" is the one area name that's an acronym, not a place name that
// title-cases correctly (the other 8 supported areas all do).
export function formatAreaName(area) {
  if (area.toLowerCase() === 'cbd') return 'CBD'
  return area.replace(/\b\w/g, (c) => c.toUpperCase())
}

// 24h integer hour -> "6:00 PM" style label
export function formatHour12(hour) {
  const period = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}:00 ${period}`
}

// 24h integer hour -> short axis tick label, e.g. "12a", "6p"
export function formatHourShort(hour) {
  if (hour === 0) return '12a'
  if (hour === 12) return '12p'
  return hour < 12 ? `${hour}a` : `${hour - 12}p`
}

// "2026-08-22" -> "22 Aug 2026". Builds the Date from local components rather
// than parsing the ISO string directly, which `Date` treats as UTC midnight
// and can shift a day backward once formatted in timezones behind UTC.
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
