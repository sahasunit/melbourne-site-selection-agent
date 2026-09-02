import { PillButton } from '../PillButton/PillButton'
import { Wrapper, Eyebrow, Headline, Divider, Body, Footnote } from './RateLimitNotice.styles'

const CONTACT_EMAIL = 'sahasunit05@gmail.com'
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Melbourne Site Select — raise my rate limit')}`

// The mockup also shows a live "N of 5 requests used" counter and an exact
// reset timestamp — neither is in the 429 response, so both stay omitted
// rather than fabricated.
export function RateLimitNotice({ detail }) {
  return (
    <Wrapper role="alert">
      <Eyebrow>We've reached the demo limit.</Eyebrow>
      <Headline>That's the limit for now</Headline>
      <Divider />
      <Body>{detail}</Body>
      <PillButton href={CONTACT_HREF}>Contact the creator</PillButton>
      <Footnote>Your earlier answers stay in the thread — scroll up to revisit them</Footnote>
    </Wrapper>
  )
}
