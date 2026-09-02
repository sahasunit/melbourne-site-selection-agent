import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Card = styled.section`
  background: ${({ theme }) => theme.color.barkBrown};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${media.tablet(`
    padding: 22px;
    gap: 18px;
  `)}

  ${media.desktop(`
    padding: 26px;
    gap: 20px;
  `)}
`

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const Label = styled.span`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

// 0.55, not 0.5 — warmCream@0.5 on barkBrown computes to 4.37:1, just under
// the 4.5:1 WCAG AA text threshold; 0.55 clears it comfortably (4.95:1)
export const MutedLabel = styled(Label)`
  opacity: 0.55;
`

// same visual treatment as Label, but a real <h3> for heading hierarchy
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
  align-items: flex-end;
  gap: 12px;

  ${media.desktop(`
    gap: 16px;
  `)}
`

export const BigNumber = styled.div`
  font-size: 36px;
  line-height: 0.9;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};

  ${media.tablet(`
    font-size: 41px;
  `)}

  ${media.desktop(`
    font-size: 51px;
  `)}
`

export const PeakGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 3px;
`

export const PeakLabel = styled.span`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.ember};
  text-transform: uppercase;
`

export const UnitLabel = styled.span`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;
`

export const Divider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.driftwood};
`

export const FooterCaption = styled.div`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;
  line-height: 1.4;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

// derived stats (daily total, quietest hour) — real numbers from hourly_counts,
// only shown once there's room to give them their own row
export const StatsRow = styled.div`
  display: none;

  ${media.tablet(`
    display: flex;
    gap: 32px;
  `)}
`

export const DerivedStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const DerivedStatLabel = styled.span`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;
`

export const DerivedStatValue = styled.span`
  font-size: 16.5px;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};
`
