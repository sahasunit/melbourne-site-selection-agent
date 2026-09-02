import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../styles/theme'
import { GlobalStyle } from '../../styles/GlobalStyle'
import { useConversation } from '../../hooks/useConversation'
import { ChatShell } from '../ChatShell/ChatShell'
import { EmptyState } from '../EmptyState/EmptyState'
import { ChatThread } from '../ChatThread/ChatThread'
import { MessageInput } from '../MessageInput/MessageInput'

export function App() {
  const [draft, setDraft] = useState('')
  const { messages, rateLimited, send, retry } = useConversation()

  function handleSubmit(question) {
    send(question)
    setDraft('')
  }

  const hasStarted = messages.length > 0

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ChatShell
        input={
          <MessageInput
            value={draft}
            onChange={setDraft}
            onSubmit={handleSubmit}
            placeholder={rateLimited ? 'Input paused' : hasStarted ? 'Ask a follow-up…' : 'Ask about a suburb…'}
            disabled={rateLimited}
          />
        }
      >
        {hasStarted ? (
          <ChatThread messages={messages} onRetry={retry} onSend={send} />
        ) : (
          <EmptyState onSelectPrompt={setDraft} />
        )}
      </ChatShell>
    </ThemeProvider>
  )
}
