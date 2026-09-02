import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ListLabel = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.55;
  text-transform: uppercase;

  ${media.tablet(`
    font-size: 11px;
  `)}

  ${media.desktop(`
    font-size: 12px;
  `)}
`

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
`

export const Row = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};

  ${media.tablet(`
    font-size: 14px;
  `)}
`

export const VenueName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SeatCount = styled.span`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  opacity: 0.6;
  flex: none;
`
