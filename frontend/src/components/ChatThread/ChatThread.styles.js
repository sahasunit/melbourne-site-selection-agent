import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Log = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  ${media.tablet(`
    padding: 36px 40px;
  `)}

  ${media.desktop(`
    padding: 48px 64px;
  `)}
`

// caps message width to match the input bar's column at each tier
export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.tablet(`
    max-width: 640px;
    gap: 28px;
  `)}

  ${media.desktop(`
    max-width: 700px;
    gap: 32px;
  `)}
`
