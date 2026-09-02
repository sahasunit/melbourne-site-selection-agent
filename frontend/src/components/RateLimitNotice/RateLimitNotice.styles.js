import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-self: stretch;
  width: 100%;
  padding-top: 12px;
`

export const Eyebrow = styled.div`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.ember};
  text-transform: uppercase;
`

export const Headline = styled.div`
  font-size: 36px;
  line-height: 0.9;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;

  ${media.desktop(`
    font-size: 51px;
  `)}
`

export const Divider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.corkBorder};
`

export const Body = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};
`

// warmCream@0.6, not driftwood — see RequestErrorNotice.styles.js for why
export const Footnote = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;
  line-height: 1.4;
`
