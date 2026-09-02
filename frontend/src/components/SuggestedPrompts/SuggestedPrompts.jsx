import { PillButton } from '../PillButton/PillButton'
import { Wrapper, Label, List } from './SuggestedPrompts.styles'

const PROMPTS = [
  'Compare Carlton and Kensington for a café',
  "What's foot traffic like in Southbank?",
  'Busiest hour on Lygon Street',
  'Is the CBD saturated with cafés?',
]

export function SuggestedPrompts({ onSelect }) {
  return (
    <Wrapper>
      <Label>Try</Label>
      <List>
        {PROMPTS.map((prompt) => (
          <li key={prompt}>
            <PillButton onClick={() => onSelect(prompt)}>{prompt}</PillButton>
          </li>
        ))}
      </List>
    </Wrapper>
  )
}
