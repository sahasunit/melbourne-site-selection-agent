import styled from 'styled-components'

export const Wrapper = styled.div`
  border: 1px dashed ${({ theme }) => theme.color.corkBorder};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;
  width: 100%;
`

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// warmCream@0.6, not driftwood — driftwood as text fails WCAG AA (max 3.19:1
// against either background; text needs 4.5:1). driftwood stays reserved for
// borders/dividers, which only need the more lenient 3:1 non-text threshold.
export const Label = styled.span`
  font-size: 11px;
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
`
