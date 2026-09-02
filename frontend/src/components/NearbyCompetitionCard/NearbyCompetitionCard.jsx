import { useId } from 'react'
import { IndustryDonut } from '../IndustryDonut/IndustryDonut'
import { VenueList } from '../VenueList/VenueList'
import { bucketIndustries } from '../../utils/bucketIndustries'
import {
  Card,
  CardHeading,
  StatRow,
  Stat,
  StatValue,
  StatLabel,
  StatDivider,
  Divider,
} from './NearbyCompetitionCard.styles'

export function NearbyCompetitionCard({ result }) {
  const { radius_meters, competitor_count, total_seats, venues } = result
  const segments = bucketIndustries(venues)
  const headingId = useId()

  return (
    <Card aria-labelledby={headingId}>
      <CardHeading id={headingId}>Competition · {radius_meters}m</CardHeading>

      <StatRow>
        <Stat>
          <StatValue>{competitor_count.toLocaleString()}</StatValue>
          <StatLabel>venues</StatLabel>
        </Stat>
        <StatDivider />
        <Stat>
          <StatValue>{total_seats.toLocaleString()}</StatValue>
          <StatLabel>total seats</StatLabel>
        </Stat>
      </StatRow>

      <IndustryDonut segments={segments} total={venues.length} />

      <Divider />

      <VenueList venues={venues} totalCount={competitor_count} />
    </Card>
  )
}
