import styled from 'styled-components'
import { media } from '../../styles/theme'

export const StyledHeader = styled.header`
  padding: 18px 24px 14px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px dashed ${({ theme }) => theme.color.corkBorder};

  ${media.tablet(`
    padding: 20px 40px;
  `)}

  ${media.desktop(`
    padding: 22px 64px;
  `)}
`

export const Wordmark = styled.h1`
  margin: 0;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;
`

// warmCream@0.6, not driftwood — see RequestErrorNotice.styles.js for why
export const DatasetCaption = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;

  ${media.tablet(`
    font-size: 11px;
  `)}

  ${media.desktop(`
    font-size: 12px;
  `)}
`
