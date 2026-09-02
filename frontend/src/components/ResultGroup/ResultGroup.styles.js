import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.tablet(`
    gap: 28px;
  `)}
`

export const AreaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const AreaHeading = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 1.09;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;
`

export const AreaDivider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.corkBorder};
`

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

// Comparison mode (exactly 2 areas): side-by-side columns from tablet up,
// each accented left-border on mobile / top-border on tablet+ (matching the
// mockup's own switch), rather than the plain stacked AreaBlock treatment.
export const ComparisonGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${media.tablet(`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  `)}
`

export const ComparisonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  // grid/flex items default to min-width:auto, which stops them shrinking
  // below their content's min-content size — without this, a column pushes
  // past its 1fr track and off the viewport instead of shrinking to fit.
  min-width: 0;
  border-left: 2px solid ${({ theme, $accent }) => ($accent === 'a' ? theme.color.ember : theme.color.driftwood)};
  padding-left: 14px;

  ${({ theme, $accent }) => {
    const color = $accent === 'a' ? theme.color.ember : theme.color.driftwood
    return media.tablet(`
      border-left: none;
      border-top: 2px solid ${color};
      padding-left: 0;
      padding-top: 12px;
    `)
  }}
`

export const ComparisonHeadingRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`

// Area A stays ember (passes AA against this row's walnutShadow context,
// 4.88:1). Area B uses warmCream@0.6 rather than driftwood, which fails AA
// as text everywhere (see RequestErrorNotice.styles.js) — driftwood stays
// reserved for the border color one row up, which only needs 3:1.
export const Eyebrow = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme, $accent }) => ($accent === 'a' ? theme.color.ember : theme.color.warmCream)};
  opacity: ${({ $accent }) => ($accent === 'a' ? 1 : 0.6)};
  text-transform: uppercase;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const Footnote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;
  line-height: 1.45;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const FootnoteLeader = styled.span`
  width: 22px;
  border-top: 1px dashed ${({ theme }) => theme.color.driftwood};
  margin-top: 6px;
  flex: none;
`
