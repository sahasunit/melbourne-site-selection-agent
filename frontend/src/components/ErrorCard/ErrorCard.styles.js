import styled from 'styled-components'
import { media } from '../../styles/theme'

// dashed border, no fill — deliberately de-emphasized against the filled
// barkBrown cards next to it, and holds its grid cell rather than collapsing
export const Card = styled.section`
  border: 1px dashed ${({ theme }) => theme.color.corkBorder};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${media.tablet(`
    padding: 20px 22px;
    gap: 12px;
  `)}

  ${media.desktop(`
    padding: 26px;
    gap: 14px;
  `)}
`

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// warmCream@0.6, not driftwood, throughout this card — see
// RequestErrorNotice.styles.js for why (driftwood fails WCAG AA as text)
export const CardHeading = styled.h3`
  margin: 0;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const Badge = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;
`

export const Message = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;

  ${media.desktop(`
    font-size: 16.5px;
  `)}
`
