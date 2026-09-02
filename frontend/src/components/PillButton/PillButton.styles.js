import styled from 'styled-components'
import { media } from '../../styles/theme'

// min-height 44px satisfies the mobile tap-target requirement — that's a
// touch-target rule, not a desktop-mouse one, so it's relaxed from tablet up
// rather than forcing every button to 44px regardless of viewport.
//
// size 'default' is the mockup's primary-chip button (suggested prompts, the
// rate-limit contact CTA); 'small' is its secondary inline-action button
// (Retry, Show all/remaining) — the mockup uses a visibly smaller footprint
// for these, not the same size as the primary chips.
export const StyledPillButton = styled.button`
  border: 1px solid ${({ theme, $variant }) =>
    $variant === 'muted' ? theme.color.driftwood : theme.color.warmCream};
  background: transparent;
  // muted text is warmCream@0.6, not driftwood — driftwood fails WCAG AA as
  // text (see RequestErrorNotice.styles.js). The border stays driftwood: it
  // only needs the 3:1 non-text threshold, which it clears against the
  // walnutShadow background muted buttons actually sit on.
  color: ${({ theme }) => theme.color.warmCream};
  opacity: ${({ $variant }) => ($variant === 'muted' ? 0.6 : 1)};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: ${({ $size }) => ($size === 'small' ? '9px 18px' : '11px 18px')};
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: 8px;
  font: ${({ theme }) => theme.font.weightMedium} ${({ $size }) => ($size === 'small' ? '11px' : '12px')}
    ${({ theme }) => theme.font.family};
  text-transform: uppercase;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${({ theme, $onSurface }) =>
      $onSurface ? theme.color.walnutShadow : theme.color.barkBrown};
    border-color: ${({ theme }) => theme.color.warmCream};
    color: ${({ theme }) => theme.color.warmCream};
    opacity: 1;
  }

  ${media.tablet(`
    min-height: 0;
  `)}

  ${({ $size }) =>
    $size !== 'small' &&
    media.tablet(`
      padding: 11px 20px;
    `)}

  ${({ $size }) =>
    $size === 'small' &&
    media.desktop(`
      padding: 9px 20px;
      font-size: 12px;
    `)}
`
