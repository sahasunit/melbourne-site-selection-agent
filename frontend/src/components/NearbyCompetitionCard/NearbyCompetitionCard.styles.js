import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Card = styled.section`
  background: ${({ theme }) => theme.color.barkBrown};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  ${media.tablet(`
    padding: 22px;
    gap: 20px;
  `)}

  ${media.desktop(`
    padding: 26px;
    gap: 22px;
  `)}
`

export const CardHeading = styled.h3`
  margin: 0;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const StatRow = styled.div`
  display: flex;
  gap: 18px;

  ${media.tablet(`
    gap: 20px;
  `)}

  ${media.desktop(`
    gap: 22px;
  `)}
`

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StatValue = styled.span`
  font-size: 30px;
  line-height: 0.9;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};

  ${media.desktop(`
    font-size: 41px;
  `)}
`

export const StatLabel = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;

  ${media.tablet(`
    font-size: 11px;
  `)}

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const StatDivider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.color.driftwood};
  opacity: 0.5;
`

export const Divider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.driftwood};
`
