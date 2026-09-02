import { PillButton } from '../PillButton/PillButton'
import { Wrapper, Heading, Label, Message } from './RequestErrorNotice.styles'

// Covers 503/500 responses and network failures (status === null) — anything
// where the request failed outright rather than one tool inside it failing.
export function RequestErrorNotice({ status, detail, question, onRetry }) {
  return (
    <Wrapper role="alert">
      <Heading>
        <Label>Couldn't get an answer</Label>
        {status && <Label>{status}</Label>}
      </Heading>
      <Message>{detail}</Message>
      <PillButton
        variant="muted"
        size="small"
        onClick={onRetry}
        aria-label={question ? `Retry: ${question}` : 'Retry'}
      >
        Retry
      </PillButton>
    </Wrapper>
  )
}
