import { SuggestedPrompts } from '../SuggestedPrompts/SuggestedPrompts'
import { formatAreaName } from '../../utils/format'
import { Wrapper, Content, Headline, Divider, Intro, Covers, CoversLabel, CoversList } from './EmptyState.styles'

// The 9 areas the real backend supports (app/tools/location_mapping.py) —
// derived through formatAreaName rather than hardcoded as display text, so
// this can't quietly drift from the tool's own area enum.
const SUPPORTED_AREAS = [
  'cbd',
  'kensington',
  'carlton',
  'docklands',
  'east melbourne',
  'north melbourne',
  'southbank',
  'parkville',
  'west melbourne',
]

export function EmptyState({ onSelectPrompt }) {
  return (
    <Wrapper>
      <Content>
        <Headline>RESEARCH BEFORE YOU SIGN THE LEASE.</Headline>
        <Divider />
        <Intro>
          Ask about any Melbourne suburb and get pedestrian counts and venue competition read
          straight from council sensors.
        </Intro>
        <SuggestedPrompts onSelect={onSelectPrompt} />
        <Covers>
          <CoversLabel>Covers</CoversLabel>
          <CoversList>{SUPPORTED_AREAS.map(formatAreaName).join(' · ')}</CoversList>
        </Covers>
      </Content>
    </Wrapper>
  )
}
