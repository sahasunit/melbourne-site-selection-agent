import { Form, VisuallyHiddenLabel, Input, SendButton } from './MessageInput.styles'

export function MessageInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask about a suburb…',
  disabled = false,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    if (!disabled && value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <VisuallyHiddenLabel htmlFor="message-input">Ask about a Melbourne suburb</VisuallyHiddenLabel>
      <Input
        id="message-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      <SendButton type="submit" disabled={disabled || !value.trim()} aria-label="Send question">
        ↑
      </SendButton>
    </Form>
  )
}
