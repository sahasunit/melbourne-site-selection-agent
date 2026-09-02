import { SuggestedPrompts } from '../SuggestedPrompts/SuggestedPrompts'
import { Wrapper, Content, Headline, Divider, Intro } from './EmptyState.styles'

export function EmptyState({ onSelectPrompt }) {
  return (
    <Wrapper>
      <Content>
        <Headline>Where should it open?</Headline>
        <Divider />
        <Intro>
          Ask about any Melbourne suburb and get pedestrian counts and venue competition read
          straight from council sensors.
        </Intro>
        <SuggestedPrompts onSelect={onSelectPrompt} />
      </Content>
    </Wrapper>
  )
}
