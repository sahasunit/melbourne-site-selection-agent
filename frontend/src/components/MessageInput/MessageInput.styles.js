import styled from 'styled-components'
import { media } from '../../styles/theme'

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 14px;
  width: 100%;

  ${media.tablet(`
    gap: 16px;
  `)}
`

export const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  border-bottom: 1px solid
    ${({ theme, disabled }) => (disabled ? theme.color.corkBorder : theme.color.warmCream)};
  background: transparent;
  padding: 1px 2px 8px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.font.weightRegular};
  color: ${({ theme }) => theme.color.warmCream};
  min-height: 44px;
  &:focus {
    outline: none;
    border-bottom:1px solid ${({ theme }) => theme.color.ember};
    transition: border-bottom 0.3s ease-in-out;
  }

  // warmCream@0.6, not driftwood, when enabled — see RequestErrorNotice.styles.js
  // for why; disabled state keeps corkBorder solid, exempt from text contrast
  // rules as inactive-control text
  &::placeholder {
    color: ${({ theme, disabled }) => (disabled ? theme.color.corkBorder : theme.color.warmCream)};
    opacity: ${({ disabled }) => (disabled ? 1 : 0.6)};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.corkBorder};
  }

  ${media.tablet(`
    font-size: 16px;
    padding: 1px 2px 9px;
  `)}
`

export const SendButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme, disabled }) => (disabled ? theme.color.corkBorder : theme.color.ember)};
  font-size: 20px;
  line-height: 1;
  padding: 0 4px 4px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  ${media.tablet(`
    font-size: 22px;
  `)}
`
