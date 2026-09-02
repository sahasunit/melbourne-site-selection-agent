import { useEffect, useState } from 'react'
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
  // Bumped only on an outgoing send, never on messages changing for any
  // other reason (a response landing, a retry) — the effect below is keyed
  // off this instead of `messages` so arriving data can't yank the user back
  // down if they've scrolled up to re-read something.
  const [sendSignal, setSendSignal] = useState(0)

  useEffect(() => {
    if (sendSignal === 0) return
    // ChatShell's Main is only `flex:1`, not height-capped, so it grows with
    // its content instead of clipping and scrolling internally — the page
    // (document/window) is the actual scroll container here, not Main.
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }, [sendSignal])

  function sendAndScroll(question) {
    send(question)
    setSendSignal((n) => n + 1)
  }

  function handleSubmit(question) {
    sendAndScroll(question)
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
          <ChatThread messages={messages} onRetry={retry} onSend={sendAndScroll} />
        ) : (
          <EmptyState onSelectPrompt={setDraft} />
        )}
      </ChatShell>
    </ThemeProvider>
  )
}
