import { StyledHeader, Wordmark, DatasetCaption } from './Header.styles'

// Request-usage counter (shown at wider breakpoints in the mockup) will be added
// once rate-limit state from POST /ask is wired up in a later phase.
export function Header() {
  return (
    <StyledHeader>
      <Wordmark>Site Select</Wordmark>
      <DatasetCaption>City of Melbourne open data</DatasetCaption>
    </StyledHeader>
  )
}
