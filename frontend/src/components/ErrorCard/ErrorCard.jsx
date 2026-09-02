import { useId } from 'react'
import { PillButton } from '../PillButton/PillButton'
import { formatAreaName } from '../../utils/format'
import { Card, HeaderRow, CardHeading, Badge, Message } from './ErrorCard.styles'

// schemaType: "error" — one tool inside an otherwise-successful response
// failed. `tool` names the failed call; there's no friendlier field to
// derive a label from than that.
const TOOL_LABELS = {
  get_foot_traffic: 'Foot traffic',
  get_nearby_competition: 'Competition',
}

// Retry re-sends the original question as a new turn — there's no API to
// retry just the one failed tool, so this is the most honest available action.
export function ErrorCard({ result, onRetry }) {
  const label = TOOL_LABELS[result.tool] ?? 'Data'
  const headingId = useId()
  const badgeId = useId()

  return (
    <Card aria-labelledby={`${headingId} ${badgeId}`}>
      <HeaderRow>
        <CardHeading id={headingId}>{label}</CardHeading>
        <Badge id={badgeId}>Unavailable</Badge>
      </HeaderRow>
      <Message>{result.message}</Message>
      <PillButton
        variant="muted"
        size="small"
        onClick={onRetry}
        aria-label={`Retry ${label.toLowerCase()} for ${formatAreaName(result.input?.area ?? '')}`}
      >
        Retry
      </PillButton>
    </Card>
  )
}
