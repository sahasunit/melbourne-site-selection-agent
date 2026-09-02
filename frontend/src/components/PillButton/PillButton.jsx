import { StyledPillButton } from './PillButton.styles'

// variant: 'default' | 'muted' (muted = driftwood, used for disabled-ish actions like Retry)
// size: 'default' | 'small' (small = the mockup's secondary inline-action style, e.g. Retry/Show all)
// onSurface: true when the button sits on a barkBrown card (hover should go to the page background instead)
// pass `href` to render as a link (e.g. a mailto:) instead of a <button>
export function PillButton({ variant = 'default', size = 'default', onSurface = false, href, children, ...props }) {
  if (href) {
    return (
      <StyledPillButton as="a" href={href} $variant={variant} $size={size} $onSurface={onSurface} {...props}>
        {children}
      </StyledPillButton>
    )
  }

  return (
    <StyledPillButton type="button" $variant={variant} $size={size} $onSurface={onSurface} {...props}>
      {children}
    </StyledPillButton>
  )
}
