import { useTheme } from 'styled-components'
import { formatHourShort } from '../../utils/format'
import { Wrapper, YAxis, YAxisLabel, ChartColumn, Svg, TickRow } from './HourlyAreaChart.styles'

const BASELINE_Y = 90
const TOP_Y = 12.6
const PLOT_HEIGHT = BASELINE_Y - TOP_Y

const LAST_HOUR = 23

const SPARSE_TICK_HOURS = [0, 6, 12, 18, 23]
const DENSE_TICK_HOURS = [0, 3, 6, 9, 12, 15, 18, 21, 23]

// hourly_counts sorted by hour, each {hour, pedestrian_count}. No fabricated
// data — the plotted shape and every label come directly from what's given.
// Some days come back with fewer than 24 readings (the backend accepts any
// day with >=20 hours as "complete") — points are positioned by their own
// `hour` field against a fixed 0-23 axis, not by array index, so a missing
// hour can't compress or shift every point after it out of alignment with
// the tick labels. The line still connects whatever points exist in hour
// order, so a gap reads as a straight interpolated segment rather than a
// break.
//
// scaleMax: optional override so two charts can share one y-scale (comparison
// mode) — the higher area's own peak becomes the ceiling for both, so the
// lower area's shape reads honestly small rather than each auto-scaling to
// fill its own card.
export function HourlyAreaChart({ hourlyCounts, scaleMax }) {
  const theme = useTheme()
  const maxValue = scaleMax ?? Math.max(...hourlyCounts.map((d) => d.pedestrian_count))

  const points = hourlyCounts.map((d) => ({
    x: (d.hour / LAST_HOUR) * 300,
    y: BASELINE_Y - (d.pedestrian_count / maxValue) * PLOT_HEIGHT,
    ...d,
  }))

  const peak = points.reduce((best, p) => (p.pedestrian_count > best.pedestrian_count ? p : best), points[0])

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const lastX = points[points.length - 1].x.toFixed(1)
  const areaPath = `${linePath} L${lastX},${BASELINE_Y} L0,${BASELINE_Y} Z`

  const gridLines = [1 / 3, 2 / 3].map((frac) => BASELINE_Y - frac * PLOT_HEIGHT)

  return (
    <Wrapper>
      <YAxis>
        <YAxisLabel $top="0px">{Math.round(maxValue)}</YAxisLabel>
        <YAxisLabel $top="50%">{Math.round(maxValue / 2)}</YAxisLabel>
        <YAxisLabel $top="100%">0</YAxisLabel>
      </YAxis>
      <ChartColumn>
        <Svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
          {scaleMax != null && (
            <line
              x1="0"
              y1={TOP_Y}
              x2="300"
              y2={TOP_Y}
              stroke={theme.color.driftwood}
              strokeWidth="1"
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {gridLines.map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="300"
              y2={y}
              stroke={theme.color.driftwood}
              strokeWidth="1"
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={areaPath} fill={theme.color.ember} fillOpacity="0.16" />
          <path
            d={linePath}
            fill="none"
            stroke={theme.color.warmCream}
            strokeOpacity="0.8"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={peak.x}
            y1={peak.y}
            x2={peak.x}
            y2={BASELINE_Y}
            stroke={theme.color.ember}
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={peak.x} cy={peak.y} r="3.4" fill={theme.color.ember} />
          <line
            x1="0"
            y1={BASELINE_Y}
            x2="300"
            y2={BASELINE_Y}
            stroke={theme.color.driftwood}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </Svg>
        <TickRow $variant="sparse" aria-hidden="true">
          {SPARSE_TICK_HOURS.map((h) => (
            <span key={h}>{formatHourShort(h)}</span>
          ))}
        </TickRow>
        <TickRow $variant="dense" aria-hidden="true">
          {DENSE_TICK_HOURS.map((h) => (
            <span key={h}>{formatHourShort(h)}</span>
          ))}
        </TickRow>
      </ChartColumn>
    </Wrapper>
  )
}
