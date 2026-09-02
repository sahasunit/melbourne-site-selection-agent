import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  gap: 14px;
`

// real y-axis values only fit comfortably once the card has room — desktop only
export const YAxis = styled.div`
  display: none;
  flex: none;
  width: 34px;
  position: relative;

  ${media.desktop(`
    display: block;
  `)}
`

// 0.55 not 0.5 — see FootTrafficCard.MutedLabel for why (same AA contrast fix)
export const YAxisLabel = styled.span`
  position: absolute;
  right: 0;
  top: ${({ $top }) => $top};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  transform: translateY(-50%);
`

export const ChartColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

export const Svg = styled.svg`
  display: block;
  overflow: visible;
  width: 100%;
  height: 104px;

  ${media.tablet(`
    height: 124px;
  `)}

  ${media.desktop(`
    height: 200px;
  `)}
`

// two tick rows exist (sparse for mobile/tablet, dense for desktop) and CSS
// swaps which is visible — avoids a JS resize listener for a purely visual switch
// aria-hidden in the JSX (redundant with the visible chart data elsewhere),
// but still visible on screen — 0.55 not 0.5 for the same AA contrast reason
export const TickRow = styled.div`
  display: ${({ $variant }) => ($variant === 'dense' ? 'none' : 'flex')};
  justify-content: space-between;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;

  ${({ $variant }) =>
    media.desktop(`display: ${$variant === 'dense' ? 'flex' : 'none'};`)}
`
