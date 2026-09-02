import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px 40px;
  gap: 24px;

  ${media.tablet(`
    align-items: center;
    padding: 40px 40px;
    gap: 28px;
  `)}

  ${media.desktop(`
    padding: 60px 64px;
    gap: 32px;
  `)}
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.tablet(`
    max-width: 640px;
    gap: 28px;
  `)}

  ${media.desktop(`
    max-width: 1120px;
    gap: 32px;
  `)}
`

export const Headline = styled.h2`
  margin: 0;
  font-size: 41px;
  line-height: 0.9;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;

  ${media.tablet(`
    font-size: 51px;
  `)}
`

export const Divider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.color.corkBorder};
`

export const Intro = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};

  ${media.tablet(`
    max-width: 592px;
  `)}

  ${media.desktop(`
    max-width: 700px;
  `)}
`
