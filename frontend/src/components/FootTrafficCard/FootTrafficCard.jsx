import { useId } from 'react'
import { HourlyAreaChart } from '../HourlyAreaChart/HourlyAreaChart'
import { formatHour12, formatDate } from '../../utils/format'
import {
  Card,
  HeaderRow,
  CardHeading,
  MutedLabel,
  StatRow,
  BigNumber,
  PeakGroup,
  PeakLabel,
  UnitLabel,
  Divider,
  FooterCaption,
  StatsRow,
  DerivedStat,
  DerivedStatLabel,
  DerivedStatValue,
} from './FootTrafficCard.styles'

export function FootTrafficCard({ result, scaleMax }) {
  const { sensor_name, sensing_date, hour, pedestrian_count, hourly_counts } = result

  const dailyTotal = hourly_counts.reduce((sum, row) => sum + row.pedestrian_count, 0)
  const quietest = hourly_counts.reduce((min, row) => (row.pedestrian_count < min.pedestrian_count ? row : min), hourly_counts[0])
  const headingId = useId()

  return (
    <Card aria-labelledby={headingId}>
      <HeaderRow>
        <CardHeading id={headingId}>Foot traffic</CardHeading>
        <MutedLabel>24 hours</MutedLabel>
      </HeaderRow>

      <StatRow>
        <BigNumber>{pedestrian_count.toLocaleString()}</BigNumber>
        <PeakGroup>
          <PeakLabel>Peak {formatHour12(hour)}</PeakLabel>
          <UnitLabel>pedestrians / hr</UnitLabel>
        </PeakGroup>
      </StatRow>

      <HourlyAreaChart hourlyCounts={hourly_counts} scaleMax={scaleMax} />

      <Divider />

      <StatsRow>
        <DerivedStat>
          <DerivedStatLabel>Daily total</DerivedStatLabel>
          <DerivedStatValue>{dailyTotal.toLocaleString()}</DerivedStatValue>
        </DerivedStat>
        <DerivedStat>
          <DerivedStatLabel>Quietest hour</DerivedStatLabel>
          <DerivedStatValue>
            {formatHour12(quietest.hour)} · {quietest.pedestrian_count.toLocaleString()}
          </DerivedStatValue>
        </DerivedStat>
      </StatsRow>

      <FooterCaption>
        Sensor {sensor_name} · {formatDate(sensing_date)}
      </FooterCaption>
    </Card>
  )
}
