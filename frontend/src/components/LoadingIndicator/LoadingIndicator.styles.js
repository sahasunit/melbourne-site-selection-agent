import styled, { keyframes } from 'styled-components'

const dotpulse = keyframes`
  0%, 100% { opacity: 0.25 }
  50% { opacity: 1 }
`

const skpulse = keyframes`
  0%, 100% { opacity: 0.35 }
  50% { opacity: 0.75 }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-self: flex-start;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }
`

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.color.ember};
  animation: ${dotpulse} 1.4s ease-in-out infinite;
  flex: none;
`

export const StatusText = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  text-transform: uppercase;
`

export const SkeletonBar = styled.div`
  height: 11px;
  width: ${({ $width }) => $width};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.color.barkBrown};
  animation: ${skpulse} 1.6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`

export const Bars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// warmCream@0.6, not driftwood — see RequestErrorNotice.styles.js for why
export const Caption = styled.div`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font.weightMedium};
  color: ${({ theme }) => theme.color.warmCream};
  opacity: 0.6;
  text-transform: uppercase;
`
