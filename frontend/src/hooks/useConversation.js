import { useCallback, useState } from 'react'
import { askQuestion } from '../api/client'

function uid() {
  return crypto.randomUUID()
}

// conversation_id: null until the server mints one on the first response, then
// sent back on every subsequent call — this is how multi-turn memory works.
export function useConversation() {
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [rateLimited, setRateLimited] = useState(false)

  const runRequest = useCallback(
    async (question, assistantId) => {
      try {
        const data = await askQuestion(question, conversationId)
        setConversationId(data.conversation_id)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, status: 'done', text: data.answer, results: data.results }
              : m,
          ),
        )
      } catch (err) {
        if (err.status === 429) {
          setRateLimited(true)
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, status: 'rate_limited', errorDetail: err.detail } : m,
            ),
          )
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, status: 'error', errorStatus: err.status, errorDetail: err.detail }
                : m,
            ),
          )
        }
      }
    },
    [conversationId],
  )

  const send = useCallback(
    (question) => {
      if (rateLimited || !question.trim()) return

      const assistantId = uid()
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'user', text: question },
        { id: assistantId, role: 'assistant', status: 'pending', question },
      ])
      runRequest(question, assistantId)
    },
    [rateLimited, runRequest],
  )

  const retry = useCallback(
    (assistantId) => {
      const target = messages.find((m) => m.id === assistantId)
      if (!target) return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, status: 'pending', errorDetail: undefined, errorStatus: undefined } : m,
        ),
      )
      runRequest(target.question, assistantId)
    },
    [messages, runRequest],
  )

  return { messages, rateLimited, send, retry }
}
