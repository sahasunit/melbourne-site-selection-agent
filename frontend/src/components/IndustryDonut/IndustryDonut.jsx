import { useTheme } from 'styled-components'
import {
  Wrapper,
  Svg,
  CenterLabel,
  CenterSubLabel,
  Legend,
  LegendRow,
  Swatch,
  LegendLabel,
  LegendCount,
  LegendPercent,
} from './IndustryDonut.styles'

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// segments: [{ label, count }], already ordered largest-first with any
// overflow already collapsed into an "Other" bucket by the caller.
export function IndustryDonut({ segments, total }) {
  const theme = useTheme()
  let offset = 0
  const arcs = segments.map((segment, i) => {
    const length = (segment.count / total) * CIRCUMFERENCE
    const arc = {
      ...segment,
      color: theme.color.chartRamp[i % theme.color.chartRamp.length],
      length,
      dashoffset: -offset,
      percent: Math.round((segment.count / total) * 100),
    }
    offset += length
    return arc
  })

  return (
    <Wrapper>
      <Svg viewBox="0 0 110 110" aria-hidden="true">
        <g transform="rotate(-90 55 55)">
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx="55"
              cy="55"
              r={RADIUS}
              fill="none"
              stroke={arc.color}
              strokeWidth="14"
              strokeDasharray={`${arc.length} ${CIRCUMFERENCE}`}
              strokeDashoffset={arc.dashoffset}
            />
          ))}
        </g>
        <CenterLabel x="55" y="52" fontSize="26">
          {total}
        </CenterLabel>
        <CenterSubLabel x="55" y="66" fontSize="8">
          VENUES
        </CenterSubLabel>
      </Svg>
      <Legend>
        {arcs.map((arc) => (
          <LegendRow key={arc.label}>
            <Swatch $color={arc.color} />
            <LegendLabel>{arc.label}</LegendLabel>
            <LegendCount>{arc.count}</LegendCount>
            <LegendPercent>· {arc.percent}%</LegendPercent>
          </LegendRow>
        ))}
      </Legend>
    </Wrapper>
  )
}
