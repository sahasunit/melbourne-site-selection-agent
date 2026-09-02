import { FootTrafficCard } from '../FootTrafficCard/FootTrafficCard'
import { NearbyCompetitionCard } from '../NearbyCompetitionCard/NearbyCompetitionCard'
import { ErrorCard } from '../ErrorCard/ErrorCard'
import { formatAreaName } from '../../utils/format'
import {
  Wrapper,
  AreaBlock,
  AreaHeading,
  AreaDivider,
  Cards,
  ComparisonGrid,
  ComparisonColumn,
  ComparisonHeadingRow,
  Eyebrow,
  Footnote,
  FootnoteLeader,
} from './ResultGroup.styles'

function getResultArea(result) {
  return result.schemaType === 'error' ? result.input?.area : result.area
}

function groupByArea(results) {
  const groups = new Map()
  for (const result of results) {
    const area = getResultArea(result)
    if (!area) continue
    if (!groups.has(area)) groups.set(area, [])
    groups.get(area).push(result)
  }
  return groups
}

function renderCard(result, area, index, onRetryTool, scaleMax) {
  if (result.schemaType === 'foot_traffic') {
    return <FootTrafficCard key={`${area}-foot_traffic-${index}`} result={result} scaleMax={scaleMax} />
  }
  if (result.schemaType === 'nearby_competition') {
    return <NearbyCompetitionCard key={`${area}-nearby_competition-${index}`} result={result} />
  }
  if (result.schemaType === 'error') {
    return <ErrorCard key={`${area}-error-${index}`} result={result} onRetry={onRetryTool} />
  }
  return null
}

function peakCountFor(areaResults) {
  return areaResults.find((r) => r.schemaType === 'foot_traffic')?.pedestrian_count
}

export function ResultGroup({ results, onRetryTool }) {
  if (!results?.length) return null

  const entries = [...groupByArea(results).entries()]

  // Exactly 2 areas gets the comparison treatment (accent columns, shared
  // chart scale); anything else falls back to plain stacked area blocks.
  if (entries.length === 2) {
    const [[areaA, resultsA], [areaB, resultsB]] = entries
    const peakA = peakCountFor(resultsA)
    const peakB = peakCountFor(resultsB)
    const sharedScaleMax = peakA != null && peakB != null ? Math.max(peakA, peakB) : undefined
    const higherArea = sharedScaleMax === peakA ? areaA : areaB

    const columns = [
      { area: areaA, areaResults: resultsA, accent: 'a' },
      { area: areaB, areaResults: resultsB, accent: 'b' },
    ]

    return (
      <Wrapper>
        <ComparisonGrid>
          {columns.map(({ area, areaResults, accent }) => (
            <ComparisonColumn key={area} $accent={accent}>
              <ComparisonHeadingRow>
                <Eyebrow $accent={accent}>{accent === 'a' ? 'Area A' : 'Area B'}</Eyebrow>
                <AreaHeading>{formatAreaName(area)}</AreaHeading>
              </ComparisonHeadingRow>
              <Cards>
                {areaResults.map((result, index) => renderCard(result, area, index, onRetryTool, sharedScaleMax))}
              </Cards>
            </ComparisonColumn>
          ))}
        </ComparisonGrid>
        {sharedScaleMax != null && (
          <Footnote>
            <FootnoteLeader />
            <span>
              Both charts share one vertical scale — the dashed line marks {formatAreaName(higherArea)}'s{' '}
              {sharedScaleMax.toLocaleString()} peak
            </span>
          </Footnote>
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {entries.map(([area, areaResults]) => (
        <AreaBlock key={area}>
          <AreaHeading>{formatAreaName(area)}</AreaHeading>
          <AreaDivider />
          <Cards>{areaResults.map((result, index) => renderCard(result, area, index, onRetryTool))}</Cards>
        </AreaBlock>
      ))}
    </Wrapper>
  )
}
