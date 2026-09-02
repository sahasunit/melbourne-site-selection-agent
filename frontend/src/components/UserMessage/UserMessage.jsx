import { Wrapper, Label, Text } from './UserMessage.styles'

export function UserMessage({ text, dimmed = false }) {
  return (
    <Wrapper $dimmed={dimmed}>
      <Label>You</Label>
      <Text>{text}</Text>
    </Wrapper>
  )
}
