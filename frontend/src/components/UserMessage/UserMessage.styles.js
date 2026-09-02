import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.45 : 1)};
  align-self: flex-end;
`

// warmCream@0.6, not driftwood — see RequestErrorNotice.styles.js for why
export const Label = styled.div`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const Text = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};
  text-align: right;
  max-width: 260px;

  ${media.tablet(`
    font-size: 16px;
    max-width: 400px;
  `)}

  ${media.desktop(`
    font-size: 16.5px;
    max-width: 460px;
  `)}
`
