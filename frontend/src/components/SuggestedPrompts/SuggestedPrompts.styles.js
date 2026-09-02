import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
`

// warmCream@0.6, not driftwood — see RequestErrorNotice.styles.js for why
export const Label = styled.div`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;

  ${media.tablet(`
    font-size: 11px;
  `)}
`

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${media.tablet(`
    flex-direction: row;
    flex-wrap: wrap;
  `)}
`
