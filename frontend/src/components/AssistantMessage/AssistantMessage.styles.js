import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-self: flex-start;
  width: 100%;

  ${media.tablet(`
    gap: 16px;
  `)}
`

export const Paragraph = styled.p`
  margin: 0;
  font-size: 15.5px;
  line-height: 1.62;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};

  ${media.tablet(`
    font-size: 16px;
  `)}

  ${media.desktop(`
    font-size: 16.5px;
  `)}
`

// same dashed-hairline treatment as ResultGroup's AreaDivider — markdown `---`
// dividers in a multi-part answer (e.g. a comparison) should read as the same
// divider the rest of the design system uses, not the browser's default hr.
export const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px dashed ${({ theme }) => theme.color.corkBorder};
`
