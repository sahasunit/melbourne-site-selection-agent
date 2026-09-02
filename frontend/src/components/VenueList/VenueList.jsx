import { useId, useMemo, useState } from 'react'
import { PillButton } from '../PillButton/PillButton'
import { Wrapper, ListLabel, List, Row, VenueName, SeatCount } from './VenueList.styles'

const INITIAL_COUNT = 5

// `totalCount` (competitor_count) is only used for the "X of Y" label text —
// what's actually shown/expandable is always driven by the venues array
// itself, which can legitimately be shorter than the official count.
export function VenueList({ venues, totalCount }) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()

  const sorted = useMemo(
    () => [...venues].sort((a, b) => a.distance_from_nearby_sensor - b.distance_from_nearby_sensor),
    [venues],
  )

  const visible = expanded ? sorted : sorted.slice(0, INITIAL_COUNT)
  const remaining = sorted.length - INITIAL_COUNT

  return (
    <Wrapper>
      <ListLabel>
        Nearest venues{!expanded && ` · ${visible.length} of ${totalCount}`}
      </ListLabel>
      <List id={listId}>
        {visible.map((venue) => (
          <Row key={`${venue.business_name}-${venue.business_address}`}>
            <VenueName>{venue.business_name}</VenueName>
            <SeatCount>{venue.number_of_seats} seats</SeatCount>
          </Row>
        ))}
      </List>
      {remaining > 0 && (
        <PillButton
          size="small"
          onSurface
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? 'Show fewer' : `Show remaining ${remaining}`}
        </PillButton>
      )}
    </Wrapper>
  )
}
