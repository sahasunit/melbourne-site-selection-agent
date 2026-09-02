import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.color.walnutShadow};
`

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

export const InputBar = styled.div`
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.color.walnutShadow};
  border-top: 1px dashed ${({ theme }) => theme.color.corkBorder};
  padding: 18px 24px 26px;
  display: flex;
  justify-content: center;

  ${media.tablet(`
    padding: 22px 40px 30px;
  `)}

  ${media.desktop(`
    padding: 24px 64px 34px;
  `)}
`

// centers the input row and caps its width to match the prose column at each tier
export const InputBarInner = styled.div`
  width: 100%;

  ${media.tablet(`
    max-width: 640px;
  `)}

  ${media.desktop(`
    max-width: 700px;
  `)}
`
