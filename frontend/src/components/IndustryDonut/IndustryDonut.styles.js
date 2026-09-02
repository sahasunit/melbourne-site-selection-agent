import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Svg = styled.svg`
  flex: none;
  width: 118px;
  height: 118px;

  ${media.tablet(`
    width: 132px;
    height: 132px;
  `)}

  ${media.desktop(`
    width: 176px;
    height: 176px;
  `)}
`

export const CenterLabel = styled.text`
  fill: ${({ theme }) => theme.color.warmCream};
  font-family: ${({ theme }) => theme.font.family};
  font-weight: ${({ theme }) => theme.font.weightMedium};
  text-anchor: middle;
`

export const CenterSubLabel = styled(CenterLabel)`
  fill-opacity: 0.55;
`

export const Legend = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
`

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;
`

export const Swatch = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ $color }) => $color};
  flex: none;
`

export const LegendLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const LegendCount = styled.span`
  opacity: 0.6;
  flex: none;
`

export const LegendPercent = styled.span`
  opacity: 0.6;
  flex: none;
  display: none;

  ${media.tablet(`
    display: inline;
  `)}
`
